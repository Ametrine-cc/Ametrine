// Site-wide interface behaviour: theme, header, burger menu, search, back-to-top, copy buttons.

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------------------------------------------------------------------- */
/* Theme                                                                  */
/* ---------------------------------------------------------------------- */

type ThemePref = "system" | "light" | "dark";
const lightQuery = window.matchMedia("(prefers-color-scheme: light)");

function readPref(): ThemePref {
    try {
        const v = localStorage.getItem("theme");
        if (v === "light" || v === "dark") return v;
    } catch {
        /* storage blocked */
    }
    return "system";
}

function applyTheme(pref: ThemePref) {
    const resolved = pref === "system" ? (lightQuery.matches ? "light" : "dark") : pref;
    root.setAttribute("data-theme", resolved);
    root.setAttribute("data-theme-pref", pref);

    document.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach((btn) => {
        btn.setAttribute("aria-checked", String(btn.dataset.themeValue === pref));
    });
    document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
        btn.setAttribute("aria-label", resolved === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
}

function setPref(pref: ThemePref) {
    try {
        if (pref === "system") localStorage.removeItem("theme");
        else localStorage.setItem("theme", pref);
    } catch {
        /* storage blocked */
    }
    applyTheme(pref);
}

applyTheme(readPref());

lightQuery.addEventListener("change", () => {
    if (readPref() === "system") applyTheme("system");
});

document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
        setPref(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
});

document.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach((btn) => {
    btn.addEventListener("click", () => setPref(btn.dataset.themeValue as ThemePref));
});

// Arrow keys move between the theme radio buttons
document.querySelectorAll<HTMLElement>("[data-theme-switch]").forEach((group) => {
    group.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
        const buttons = [...group.querySelectorAll<HTMLButtonElement>("button")];
        const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
        if (i < 0) return;
        e.preventDefault();
        const next = buttons[(i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length];
        next?.focus();
        next?.click();
    });
});

/* ---------------------------------------------------------------------- */
/* Modal helpers (shared by the burger menu and search)                   */
/* ---------------------------------------------------------------------- */

let openCount = 0;

function lockScroll(on: boolean) {
    openCount = Math.max(0, openCount + (on ? 1 : -1));
    document.body.classList.toggle("is-locked", openCount > 0);
}

function openDialog(dialog: HTMLDialogElement) {
    if (dialog.open) return;
    dialog.showModal();
    lockScroll(true);
    requestAnimationFrame(() => requestAnimationFrame(() => dialog.classList.add("is-open")));
}

function closeDialog(dialog: HTMLDialogElement, after?: () => void) {
    if (!dialog.open) return;
    dialog.classList.remove("is-open");
    const finish = () => {
        dialog.close();
        lockScroll(false);
        after?.();
    };
    if (reduceMotion.matches) finish();
    else window.setTimeout(finish, 380);
}

function wireDialog(dialog: HTMLDialogElement, onClose: () => void) {
    // Escape key
    dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        onClose();
    });
    // Click on the backdrop
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) onClose();
    });
}

/* ---------------------------------------------------------------------- */
/* Burger menu                                                            */
/* ---------------------------------------------------------------------- */

const menu = document.querySelector<HTMLDialogElement>("[data-menu]");
const burgers = document.querySelectorAll<HTMLButtonElement>("[data-menu-open]");

function setBurgerState(open: boolean) {
    burgers.forEach((b) => {
        b.setAttribute("aria-expanded", String(open));
        b.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
}

function openMenu() {
    if (!menu) return;
    setBurgerState(true);
    openDialog(menu);
    menu.querySelector<HTMLElement>("[data-menu-close]")?.focus();
}

function closeMenu(after?: () => void) {
    if (!menu) return;
    setBurgerState(false);
    closeDialog(menu, () => {
        burgers[0]?.focus({ preventScroll: true });
        after?.();
    });
}

if (menu) {
    burgers.forEach((b) => b.addEventListener("click", () => (menu.open ? closeMenu() : openMenu())));
    menu.querySelectorAll("[data-menu-close]").forEach((el) => el.addEventListener("click", () => closeMenu()));
    wireDialog(menu, () => closeMenu());

    // Close when a link inside is followed (helps with #hash links on the same page)
    menu.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        a.addEventListener("click", () => {
            if (a.target !== "_blank") closeMenu();
        });
    });

    // If the screen grows past the mobile breakpoint, close the menu
    window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
        if (e.matches && menu.open) {
            setBurgerState(false);
            menu.classList.remove("is-open");
            menu.close();
            lockScroll(false);
        }
    });
}

/* ---------------------------------------------------------------------- */
/* Search palette                                                         */
/* ---------------------------------------------------------------------- */

const search = document.querySelector<HTMLDialogElement>("[data-search]");

if (search) {
    const input = search.querySelector<HTMLInputElement>("[data-search-input]")!;
    const items = [...search.querySelectorAll<HTMLLIElement>("[data-item]")];
    const groups = [...search.querySelectorAll<HTMLLIElement>("[data-group]")];
    const empty = search.querySelector<HTMLElement>("[data-search-empty]")!;
    let active = 0;
    let returnFocus: HTMLElement | null = null;

    const visibleLinks = () =>
        items.filter((li) => !li.hidden).map((li) => li.querySelector<HTMLAnchorElement>("a")!);

    function highlight(index: number) {
        const links = visibleLinks();
        if (!links.length) return;
        active = (index + links.length) % links.length;
        links.forEach((a, i) => a.setAttribute("aria-selected", String(i === active)));
        const current = links[active];
        if (current) {
            current.scrollIntoView({ block: "nearest" });
            if (!current.id) current.id = `sr-${Math.random().toString(36).slice(2, 8)}`;
            input.setAttribute("aria-activedescendant", current.id);
        }
    }

    function filter(q: string) {
        const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
        items.forEach((li) => {
            const text = li.dataset.text ?? "";
            li.hidden = !terms.every((t) => text.includes(t));
        });
        groups.forEach((g) => {
            g.hidden = !g.querySelector("[data-item]:not([hidden])");
        });
        const count = visibleLinks().length;
        empty.hidden = count > 0;
        items.forEach((li) => li.querySelector("a")?.setAttribute("aria-selected", "false"));
        if (count) highlight(0);
        else input.removeAttribute("aria-activedescendant");
    }

    function openSearch() {
        returnFocus = document.activeElement as HTMLElement | null;
        const start = () => {
            input.value = "";
            filter("");
            openDialog(search!);
            input.focus();
        };
        if (menu?.open) closeMenu(start);
        else start();
    }

    function closeSearch() {
        closeDialog(search!, () => returnFocus?.focus({ preventScroll: true }));
    }

    document.querySelectorAll("[data-open-search]").forEach((el) => el.addEventListener("click", openSearch));
    search.querySelector("[data-search-close]")?.addEventListener("click", closeSearch);
    wireDialog(search, closeSearch);

    input.addEventListener("input", () => filter(input.value));

    input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            highlight(active + 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            highlight(active - 1);
        } else if (e.key === "Enter") {
            const link = visibleLinks()[active];
            if (link) {
                e.preventDefault();
                if (link.target === "_blank") {
                    window.open(link.href, "_blank", "noopener");
                    closeSearch();
                } else {
                    closeDialog(search!);
                    window.location.href = link.href;
                }
            }
        }
    });

    search.querySelectorAll<HTMLAnchorElement>(".search-result").forEach((a) => {
        a.addEventListener("click", () => closeDialog(search!));
    });

    // Ctrl K / Cmd K and "/" open search
    window.addEventListener("keydown", (e) => {
        const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            search.open ? closeSearch() : openSearch();
        } else if (e.key === "/" && !typing && !search.open) {
            e.preventDefault();
            openSearch();
        }
    });

    // Show the right shortcut for the visitor's OS
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    document.querySelectorAll<HTMLElement>("[data-kbd]").forEach((k) => (k.textContent = isMac ? "⌘ K" : "Ctrl K"));
}

/* ---------------------------------------------------------------------- */
/* Header: background once scrolled, hide on scroll down, show on up       */
/* ---------------------------------------------------------------------- */

const header = document.querySelector<HTMLElement>("[data-header]");
const toTop = document.querySelector<HTMLButtonElement>("[data-to-top]");
let lastY = window.scrollY;
let ticking = false;

function onScroll() {
    const y = window.scrollY;
    if (header) {
        header.classList.toggle("is-scrolled", y > 8);
        const goingDown = y > lastY + 4;
        const goingUp = y < lastY - 4;
        if (goingDown && y > 240 && !header.contains(document.activeElement)) header.classList.add("is-hidden");
        else if (goingUp || y < 120) header.classList.remove("is-hidden");
    }
    toTop?.classList.toggle("is-visible", y > 600);
    lastY = y;
    ticking = false;
}

window.addEventListener(
    "scroll",
    () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
        }
    },
    { passive: true },
);
onScroll();

header?.addEventListener("focusin", () => header.classList.remove("is-hidden"));

toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
});

/* ---------------------------------------------------------------------- */
/* Copy-to-clipboard buttons                                              */
/* ---------------------------------------------------------------------- */

document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
        const text = btn.dataset.copy ?? "";
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.append(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
        }
        const label = btn.querySelector("[data-copy-label]");
        const before = label?.textContent;
        btn.classList.add("is-copied");
        if (label) label.textContent = "Copied";
        window.setTimeout(() => {
            btn.classList.remove("is-copied");
            if (label && before) label.textContent = before;
        }, 1600);
    });
});
