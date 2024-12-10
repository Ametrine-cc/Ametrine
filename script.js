// Popup Modal
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
  
    setTimeout(() => {
      popup.classList.remove("hidden");
    }, 3000);
  
    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  });
  
// Back to Top Button functionality

let backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {

        backToTopBtn.style.display = "block";

    } else {

        backToTopBtn.style.display = "none";

    }

};

backToTopBtn.onclick = function() {

    window.scrollTo({ top: 0, behavior: 'smooth' });

};
  

// Cursor Trail functionality

document.body.addEventListener('mousemove', function(event) {

  let cursorTrail = document.createElement('div');

  cursorTrail.classList.add('cursor-trail');

  document.body.appendChild(cursorTrail);



  cursorTrail.style.left = `${event.pageX - 5}px`;

  cursorTrail.style.top = `${event.pageY - 5}px`;



  setTimeout(() => {

      cursorTrail.remove();

  }, 600); // Match the animation duration

});

// Clock functionality

function updateClock() {

  const clock = document.getElementById('clock');

  const now = new Date();

  let hours = now.getHours();

  let minutes = now.getMinutes();

  let seconds = now.getSeconds();



  hours = hours < 10 ? '0' + hours : hours;

  minutes = minutes < 10 ? '0' + minutes : minutes;

  seconds = seconds < 10 ? '0' + seconds : seconds;



  clock.innerHTML = `${hours}:${minutes}:${seconds}`;

}



// Update clock every second

setInterval(updateClock, 1000);

updateClock(); // Initial call to display the clock immediately