const spinner = document.querySelector(".spinner");

export const showSpinner = () => {
    spinner.classList.add("visible");
    setTimeout(() => {
        spinner.classList.add("active");
    }, 10);
};

export const hideSpinner = () => {
    const onTransitionEnd = () => {
        spinner.classList.remove("visible");
        spinner.removeEventListener("transitionend", onTransitionEnd);
    };

    spinner.classList.remove("active");
    spinner.addEventListener("transitionend", onTransitionEnd);
};
