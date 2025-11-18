(function () {
    // Target: after 12 December 2025 (i.e. from 2025-12-13 00:00 local time)
    const unlock = new Date('2025-12-13T00:00:00'); // explicit ISO string, not 0-based
    const now = new Date();
    if (now < unlock) {
        function formatRemaining(ms) {
            let s = Math.floor(ms / 1000);
            const d = Math.floor(s / 86400); s -= d * 86400;
            const h = Math.floor(s / 3600); s -= h * 3600;
            const m = Math.floor(s / 60); s -= m * 60;
            return d + "d " + h + "h " + m + "m " + s + "s";
        }

        document.title = "Unavailable until 13 Dec 2025";
        const wrapper = document.createElement('div');
        wrapper.style.minHeight = "100vh";
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.justifyContent = "center";
        wrapper.style.alignItems = "center";
        wrapper.style.textAlign = "center";
        wrapper.style.padding = "2rem";
        wrapper.style.fontFamily = "system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif";
        wrapper.style.color = "#111";
        
        const h = document.createElement('h1');
        h.textContent = "Site temporarily unavailable";
        const p = document.createElement('p');
        p.textContent = "This site will be available after 12 December 2025.";
        const countdown = document.createElement('p');
        countdown.style.fontWeight = "600";
        countdown.style.marginTop = "1rem";
        countdown.id = "ametrine-countdown";
        countdown.textContent = formatRemaining(unlock - now);

        wrapper.appendChild(h);
        wrapper.appendChild(p);
        wrapper.appendChild(countdown);

        // Replace body content
        document.body.replaceChildren(wrapper);

        // Update countdown every second and reload when unlocked
        const iv = setInterval(function () {
            const now2 = new Date();
            if (now2 >= unlock) {
                clearInterval(iv);
                location.reload();
                return;
            }
            const el = document.getElementById('ametrine-countdown');
            if (el) el.textContent = formatRemaining(unlock - now2);
        }, 1000);
    }
})();
