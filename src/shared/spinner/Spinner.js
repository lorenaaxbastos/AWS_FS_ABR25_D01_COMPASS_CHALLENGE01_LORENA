export const hideSpinner = (component) => {
    const section = component.closest("section");

    if (section) {
        const spinner = section.querySelector(".spinner");

        if (spinner) {
            setTimeout(() => {
                spinner.classList.add("spinner-hidden");

                spinner.offsetHeight;

                setTimeout(() => {
                    spinner.remove();
                }, 300);
            }, 1000);
        }
    }
};
