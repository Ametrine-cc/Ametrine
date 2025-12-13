(function () {
    const WORKER_URL = 'https://ametrine.cc/api/check';
    
    fetch(WORKER_URL)
        .then(res => res.json())
        .then(data => {
            if (data.isLocked) {
                showLockScreen(data.remainingMs);
            }
        })
        .catch(err => {
            console.error('Failed to check lock status:', err);
        });

    function showLockScreen(remaining) {
        document.title = "Unavailable until 23 Dec 2025";
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
        p.textContent = "This site will be available after 22nd of December 2025.";
        const countdown = document.createElement('p');
        countdown.style.fontWeight = "600";
        countdown.style.marginTop = "1rem";
        countdown.id = "ametrine-countdown";
        
        function formatRemaining(ms) {
            let s = Math.floor(ms / 1000);
            const d = Math.floor(s / 86400); s -= d * 86400;
            const h = Math.floor(s / 3600); s -= h * 3600;
            const m = Math.floor(s / 60); s -= m * 60;
            return d + "d " + h + "h " + m + "m " + s + "s";
        }
        
        countdown.textContent = formatRemaining(remaining);
        wrapper.appendChild(h);
        wrapper.appendChild(p);
        wrapper.appendChild(countdown);
        document.body.replaceChildren(wrapper);
        
        const iv = setInterval(() => {
            remaining -= 1000;
            if (remaining <= 0) {
                clearInterval(iv);
                location.reload();
                return;
            }
            countdown.textContent = formatRemaining(remaining);
        }, 1000);
    }
})();