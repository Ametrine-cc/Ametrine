document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("project-grid");

  if (!projectsContainer) {
    console.error('Error: Container element with ID "project-grid" not found.');
    return;
  }

  fetch("./projects/projects.json")
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

        // Create and populate the project image div
        const projectImageDiv = document.createElement("div");
        projectImageDiv.classList.add("project-image");
        projectImageDiv.textContent = project.image; // e.g., "💻"
        projectCard.appendChild(projectImageDiv);

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
