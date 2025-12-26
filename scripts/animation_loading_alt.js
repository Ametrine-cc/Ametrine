(function () {
  // Create overlay
  const overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "#000",
    zIndex: "9998",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "1",
    transition: "opacity 0.5s ease-out",
  });

  // Create loader container
  const loaderContainer = document.createElement("div");
  Object.assign(loaderContainer.style, {
    position: "relative",
    width: "150px",
    height: "150px",
  });

  // Create SVG circle
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  Object.assign(svg.style, {
    transform: "rotate(-90deg)",
    width: "100%",
    height: "100%",
  });
  svg.setAttribute("viewBox", "0 0 150 150");

  // Background circle
  const bgCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  bgCircle.setAttribute("cx", "75");
  bgCircle.setAttribute("cy", "75");
  bgCircle.setAttribute("r", "65");
  bgCircle.setAttribute("fill", "none");
  bgCircle.setAttribute("stroke", "#333");
  bgCircle.setAttribute("stroke-width", "8");

  // Progress circle
  const progressCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  progressCircle.setAttribute("cx", "75");
  progressCircle.setAttribute("cy", "75");
  progressCircle.setAttribute("r", "65");
  progressCircle.setAttribute("fill", "none");
  progressCircle.setAttribute("stroke", "url(#gradient)");
  progressCircle.setAttribute("stroke-width", "8");
  progressCircle.setAttribute("stroke-linecap", "round");

  const circumference = 2 * Math.PI * 65;
  progressCircle.style.strokeDasharray = circumference;
  progressCircle.style.strokeDashoffset = circumference;
  progressCircle.style.transition = "stroke-dashoffset 0.05s linear";

  // Gradient definition
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  gradient.setAttribute("id", "gradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "0%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("style", "stop-color:#a855f7;stop-opacity:0.57");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("style", "stop-color:#a700da;stop-opacity:1");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);
  svg.appendChild(bgCircle);
  svg.appendChild(progressCircle);

  // Percentage text
  const percentText = document.createElement("div");
  Object.assign(percentText.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "32px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
  });
  percentText.textContent = "0%";

  // Build structure
  loaderContainer.appendChild(svg);
  loaderContainer.appendChild(percentText);
  overlay.appendChild(loaderContainer);
  document.body.appendChild(overlay);

  // Loading animation
  let progress = 0;
  const duration = 1000;
  const interval = 20;
  const increment = (100 / duration) * interval;

  const timer = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);

      setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.remove();
        }, 500);
      }, 200);
    }

    const offset = circumference - (progress / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    percentText.textContent = Math.floor(progress) + "%";
  }, interval);
})();
