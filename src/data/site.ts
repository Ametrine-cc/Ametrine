// Site-wide settings, navigation and links.
// Edit this file to change links in the header, burger menu, search and footer.

export const site = {
    name: "Ametrine Foundation",
    shortName: "Ametrine",
    url: "https://ametrine.cc",
    description:
        "Ametrine Foundation is a volunteer team building free, open-source and privacy-first libraries and apps. No telemetry, no licence fees.",
    tagline: "Software that actually cares about you.",
    year: new Date().getFullYear(),
};

export const links = {
    github: "https://github.com/Ametrine-cc",
    docs: "https://docs.ametrine.cc",
    kofi: "https://ko-fi.com/ametrinefoundation",
    bluesky: "https://bsky.app/profile/ametrine.cc",
};

export type NavItem = {
    label: string;
    href: string;
    blurb: string;
    external?: boolean;
};

// Main navigation (header on desktop, burger menu on mobile)
export const nav: NavItem[] = [
    { label: "Home", href: "/", blurb: "Start here" },
    { label: "Projects", href: "/projects", blurb: "Libraries and apps we maintain" },
    { label: "About", href: "/about", blurb: "Who we are and what we believe" },
    { label: "Docs", href: links.docs, blurb: "Guides and API references", external: true },
];

export type Social = { label: string; href: string; icon: "github" | "bluesky" | "kofi" };

export const socials: Social[] = [
    { label: "GitHub", href: links.github, icon: "github" },
    { label: "Bluesky", href: links.bluesky, icon: "bluesky" },
    { label: "Ko-fi", href: links.kofi, icon: "kofi" },
];
