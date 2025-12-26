// Client-side projects loader — runs in the browser
document.addEventListener("DOMContentLoaded", () => {
  const loadProjects = async () => {
    try {
      const res = await fetch("./projects.json");
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error("Failed to load projects.json:", err);
      return [];
    }
  };

  const escapeHTML = (str) => {
    if (typeof str !== "string") return "";
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  };

  const generateProjectCards = (projects) =>
    projects
      .map(
        (project) => `
        <div class="project-card">
            <h2>${escapeHTML(project.name)}</h2>
            <p>${escapeHTML(project.description)}</p>
            <div class="project-links">
                <a href="${escapeHTML(project.link || "#")}" target="_blank" class="btn btn-primary">Details</a>

                <a href="${escapeHTML(project.download_link || "#")}" target="_blank" class="btn btn-primary">Install</a>
            </div>
        </div>
    `,
      )
      .join("");

  const displayProjects = async () => {
    const projects = await loadProjects();
    const projectsGrid = document.querySelector(".projects-grid");
    if (!projectsGrid) {
      console.warn(
        'No element with class ".projects-grid" found in the document.',
      );
      return;
    }
    projectsGrid.innerHTML = generateProjectCards(projects);
  };

  displayProjects();
});
