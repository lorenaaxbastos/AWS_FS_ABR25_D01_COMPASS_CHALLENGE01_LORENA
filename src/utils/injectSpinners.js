export const injectSpinners = (container = document) => {
    const sections = container.querySelectorAll("section");

    sections.forEach((section) => {
        const spinner = document.createElement("div");
        spinner.className = "spinner";
        spinner.setAttribute("aria-label", "Carregando...");
        spinner.setAttribute("aria-live", "assertive");
        spinner.setAttribute("role", "status");

        const visuallyHidden = document.createElement("span");
        visuallyHidden.className = "visually-hidden";
        visuallyHidden.textContent = "Carregando...";

        spinner.appendChild(visuallyHidden);

        section.insertBefore(spinner, section.firstChild);
    });
};
