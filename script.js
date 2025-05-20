// Navigation menu functionality
const fab = document.getElementById('fab');
const popup = document.getElementById('popupMenu');
const closeBtn = document.getElementById('closePopup');

fab?.addEventListener('click', () => {
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeBtn?.addEventListener('click', () => {
    popup.classList.add('hidden');
    document.body.style.overflow = '';
});

popup?.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Product popup functionality
const productPopup = document.getElementById('productPopup');
const closeProductPopup = document.getElementById('closeProductPopup');
const popupProductImg = document.getElementById('popupProductImg');
const popupProductTitle = document.getElementById('popupProductTitle');
const popupProductDesc = document.getElementById('popupProductDesc');
const popupGithub = document.getElementById('popupGithub');
const popupDownload = document.getElementById('popupDownload');

// Add click handlers to all product items
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', () => {
        // Update popup content
        popupProductImg.src = item.dataset.img;
        popupProductImg.alt = item.dataset.title;
        popupProductTitle.textContent = item.dataset.title;
        popupProductDesc.textContent = item.dataset.desc;
        popupGithub.href = item.dataset.github;
        popupDownload.href = item.dataset.download;
        
        // Show popup
        productPopup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
});

// Close product popup
closeProductPopup?.addEventListener('click', () => {
    productPopup.classList.add('hidden');
    document.body.style.overflow = '';
});

// Close product popup when clicking outside
productPopup?.addEventListener('click', (e) => {
    if (e.target === productPopup) {
        productPopup.classList.add('hidden');
        document.body.style.overflow = '';
    }
});