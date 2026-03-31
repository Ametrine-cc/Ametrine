// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 200);
});

// Trigger shatter after gem shoots up
setTimeout(() => {
  document.getElementById("gemContainer").classList.add("shatter");
}, 800); // Shatter after gem reaches center

// Hide preloader after shards fly off
setTimeout(() => {
  document.getElementById("preloader").classList.add("complete");
}, 1400); // Hide after shards complete animation
