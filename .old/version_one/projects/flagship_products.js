document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("project-grid");

  if (!projectsContainer) {
    console.error('Error: Container element with ID "project-grid" not found.');
    return;
  }

  // Function to apply responsive styles based on screen size
  const applyResponsiveStyles = () => {
    // Define your mobile breakpoint (e.g., screens smaller than or equal to 768px wide)
    const isMobile = window.innerWidth <= 768;
    const gap = 16; // Consistent gap between project cards
    const numProjectCards =
      projectsContainer.querySelectorAll(".project-card").length;

    if (isMobile) {
      // Mobile layout: Horizontal flex scroll, 1 card per view
      projectsContainer.style.display = "flex";
      projectsContainer.style.overflowX = "scroll"; // Enable horizontal scrolling
      projectsContainer.style.scrollSnapType = "x mandatory"; // Optional: for smoother snapping
      projectsContainer.style.gap = `${gap}px`; // Space between project cards
      projectsContainer.style.paddingBottom = "1rem"; // Add padding to prevent scrollbar from overlapping content
      // Hide scrollbar for various browsers
      projectsContainer.style.scrollbarWidth = "none"; // Firefox
      projectsContainer.style.MsOverflowStyle = "none"; // IE/Edge
      projectsContainer.style.gridTemplateColumns = ""; // Clear grid columns if set

      // Apply mobile-specific card styles
      Array.from(projectsContainer.children).forEach((card) => {
        if (card.classList.contains("project-card")) {
          card.style.flexShrink = "0"; // Prevent cards from shrinking below their calculated width
          card.style.flexBasis = "100%"; // Set the preferred size for flex items to full width
          card.style.width = "100%"; // Explicitly set width for consistency
          card.style.scrollSnapAlign = "start"; // Align each card to the start of the scroll container
        }
      });
    } else {
      // Desktop layout
      projectsContainer.style.display = "grid";

      if (numProjectCards === 1) {
        // If there's only one project, make it fill the available grid space
        projectsContainer.style.gridTemplateColumns = "1fr";
      } else {
        // Multiple projects: Grid with 3 cards per row
        projectsContainer.style.gridTemplateColumns = "repeat(3, 1fr)"; // 3 equal width columns
      }

      projectsContainer.style.gap = `${gap}px`; // Space between grid items
      projectsContainer.style.overflowX = "hidden"; // Disable horizontal scrolling
      projectsContainer.style.scrollSnapType = "none"; // Disable scroll snapping
      projectsContainer.style.paddingBottom = "0"; // No scrollbar, so no extra padding needed
      // Restore default scrollbar behavior for desktop
      projectsContainer.style.scrollbarWidth = "unset";
      projectsContainer.style.MsOverflowStyle = "unset";

      // Clear flexbox-related styles from cards for grid layout
      Array.from(projectsContainer.children).forEach((card) => {
        if (card.classList.contains("project-card")) {
          card.style.flexShrink = "";
          card.style.flexBasis = "";
          card.style.width = "";
          card.style.scrollSnapAlign = "";
        }
      });
    }
  };

  // Debounce the resize event to prevent excessive function calls
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyResponsiveStyles, 100);
  });

  fetch("/projects/flagship.json")
    .then((response) => {
      if (!response.ok) {
        // Throw an error if the network request was not successful (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((projects) => {
      // Iterate over each project in the fetched data
      projects.forEach((project) => {
        // Create the main project card div
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        // Make the project card clickable if a link is provided
        // We assume 'project.link' will contain the path to the project's page,
        // e.g., "/refresh/refresh.html" as per the prompt's example.
        if (project.link) {
          projectCard.style.cursor = "pointer"; // Indicate clickable
          projectCard.addEventListener("click", () => {
            window.location.href = project.link;
          });
        }

        // Create the project content div
        const projectContentDiv = document.createElement("div");
        projectContentDiv.classList.add("project-content");

        // Create and populate the project tag span
        const projectTagSpan = document.createElement("span");
        projectTagSpan.classList.add("project-tag");
        projectTagSpan.textContent = project.tag; // e.g., "Desktop"
        projectContentDiv.appendChild(projectTagSpan);

        // Create and populate the project title heading
        const projectTitleH3 = document.createElement("h3");
        projectTitleH3.classList.add("project-title");
        projectTitleH3.textContent = project.title; // e.g., "Lumina"
        projectContentDiv.appendChild(projectTitleH3);

        // Create and populate the project description paragraph
        const projectDescriptionP = document.createElement("p");
        projectDescriptionP.classList.add("project-description");
        projectDescriptionP.textContent = project.description; // e.g., "A community-driven..."
        projectContentDiv.appendChild(projectDescriptionP);

        // Create the project stats div
        const projectStatsDiv = document.createElement("div");
        projectStatsDiv.classList.add("project-stats");

        // Create and populate the stars stat div
        const starsStatDiv = document.createElement("div");
        starsStatDiv.classList.add("project-stat");
        starsStatDiv.textContent = `⭐ ${project.stars}`; // e.g., "⭐ 1"
        projectStatsDiv.appendChild(starsStatDiv);

        // Create and populate the forks stat div
        const forksStatDiv = document.createElement("div");
        forksStatDiv.classList.add("project-stat");
        forksStatDiv.textContent = `🔀 ${project.forks}`; // e.g., "🔀 0 forks"
        projectStatsDiv.appendChild(forksStatDiv);

        // Create and populate the license stat div
        const licenseStatDiv = document.createElement("div");
        licenseStatDiv.classList.add("project-stat");
        licenseStatDiv.textContent = `📦 ${project.license}`; // e.g., "📦 MIT"
        projectStatsDiv.appendChild(licenseStatDiv);

        // Append project stats to project content
        projectContentDiv.appendChild(projectStatsDiv);
        // Append project content to project card
        projectCard.appendChild(projectContentDiv);

        // Append the complete project card to the projects container
        projectsContainer.appendChild(projectCard);
      });

      // After all projects are appended, apply initial responsive styles
      applyResponsiveStyles();
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch operation
      console.error("Error loading projects:", error);
      // Optionally, display a user-friendly error message on the page
      if (projectsContainer) {
        projectsContainer.innerHTML =
          "<p>Failed to load projects. Please try again later.</p>";
      }
    });
});
