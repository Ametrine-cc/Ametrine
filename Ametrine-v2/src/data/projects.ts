// Every project shown on the site lives here.
// Home page shows the ones marked `flagship: true`.
// The Projects page shows everything, grouped by `kind`.

export type Project = {
    slug: string;
    name: string;
    kind: "library" | "application";
    tagline: string;
    description: string;
    languages: string[];
    license: string;
    version: string;
    github: string;
    flagship?: boolean;
    features?: string[];
};

export const projects: Project[] = [
    {
        slug: "miamore",
        name: "miamore",
        kind: "library",
        tagline: "A better way of making TUIs",
        description:
            "A lightweight C library for building terminal user interfaces, with official Rust bindings.",
        features: [
            "24-bit truecolour rendering",
            "Display list command queues",
            "Multithreaded animation via pthreads",
            "Official Rust bindings",
        ],
        languages: ["C", "Rust"],
        license: "LGPLv3",
        version: "0.1.1",
        github: "https://github.com/ametrine-cc/miamore",
        flagship: true,
    },
    {
        slug: "uninstall-me",
        name: "uninstall-me",
        kind: "library",
        tagline: "Making uninstallation easy for everyone",
        description:
            "A small C library, with official Rust bindings, that lets any program offer an --uninstall flag and remove every file it put on your system, instead of relying on a package manager to clean up.",
        features: [
            "Adds --uninstall to your program",
            "Removes every file the program installed",
            "No package manager required",
            "Official Rust bindings",
        ],
        languages: ["C", "Rust"],
        license: "GPLv3",
        version: "0.1.0",
        github: "https://github.com/ametrine-cc/uninstall-me",
        flagship: true,
    },
    // Applications go here when they are released, for example:
    // {
    //     slug: "kasane",
    //     name: "Kasane",
    //     kind: "application",
    //     tagline: "Module, package & project manager",
    //     description: "...",
    //     languages: ["Rust"],
    //     license: "GPLv3",
    //     version: "0.1.0",
    //     github: "https://github.com/Ametrine-cc/kasane",
    // },
];

export const libraries = projects.filter((p) => p.kind === "library");
export const applications = projects.filter((p) => p.kind === "application");
export const flagship = projects.filter((p) => p.flagship);
