(function() {
    // Create overlay
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: '#000',
        zIndex: '9998',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '1',
        transition: 'opacity 0.5s ease-out'
    });
    
    // Create loader elements
    const loaderContainer = document.createElement('div');
    const loaderBg = document.createElement('div');
    const loaderBar = document.createElement('div');
    const loaderText = document.createElement('div');
    const percentSpan = document.createElement('span');
    
    // Style loader container
    Object.assign(loaderContainer.style, {
        width: '80%',
        maxWidth: '400px',
        zIndex: '9999'
    });
    
    // Style loader background
    Object.assign(loaderBg.style, {
        width: '100%',
        height: '8px',
        background: '#333',
        borderRadius: '10px',
        overflow: 'hidden'
    });
    
    // Style loader bar
    Object.assign(loaderBar.style, {
        height: '100%',
        width: '0%',
        background: 'linear-gradient(90deg, #a855f791, #a700daff)',
        borderRadius: '10px',
        transition: 'width 0.05s linear'
    });
    
    // Style loader text
    Object.assign(loaderText.style, {
        textAlign: 'center',
        marginTop: '15px',
        color: '#fff',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif'
    });
    
    // Build structure
    percentSpan.textContent = '0';
    loaderText.appendChild(percentSpan);
    loaderText.appendChild(document.createTextNode('%'));
    loaderBg.appendChild(loaderBar);
    loaderContainer.appendChild(loaderBg);
    loaderContainer.appendChild(loaderText);
    overlay.appendChild(loaderContainer);
    document.body.appendChild(overlay);
    
    // Loading animation
    let progress = 0;
    const duration = 2000;
    const interval = 20;
    const increment = (100 / duration) * interval;
    
    const timer = setInterval(() => {
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 200);
        }
        
        loaderBar.style.width = progress + '%';
        percentSpan.textContent = Math.floor(progress);
    }, interval);
})();