import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { titleCase } from "../../../utils/format.js";

class Slider extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Slider";

    async setupAttributes() {
        const data = await loadPartial(this.getAttribute("data"));
        const container = this.shadowRoot.querySelector(".slides");
        const buttons = this.shadowRoot.querySelectorAll(".slider__btn");
        const effect = this.getAttribute("effect");
        const type = this.getAttribute("type");

        container.setAttribute(
            "aria-label",
            titleCase(`${type} ${container.getAttribute("aria-label")}`)
        );

        const cardElements = [];

        const recalculateHeight = () => {
            const maxHeight = Math.max(
                ...cardElements.map((slide) => slide.clientHeight)
            );
            container.style.height = `${maxHeight + 55}px`;
        };

        if (type === "testimonial") {
            const promises = data.data.map((feedback) => {
                return new Promise((resolve) => {
                    const slide = document.createElement("ui-testimonial-card");

                    slide.setAttribute("author", feedback.full_name);
                    slide.setAttribute("job", feedback.profession);
                    slide.setAttribute("photo", feedback.image_url);
                    slide.setAttribute("feedback", feedback.message);
                    slide.setAttribute("tabindex", "-1");

                    slide.addEventListener("card-ready", () => {
                        cardElements.push(slide);
                        resolve();
                    });

                    container.appendChild(slide);
                });
            });

            await Promise.all(promises);
            recalculateHeight();
        }

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => recalculateHeight(), 200);
        });

        const slides = Array.from(container.children);

        let currentSlide = 0;

        if (effect === "fade") {
            slides.forEach((slide) => (slide.style.opacity = 0));
        }

        const goToSlide = (index) => {
            slides.forEach((slide, i) => {
                if (effect === "slide") {
                    slide.style.transform = `translateX(${(i - index) * 100}%)`;
                } else if (effect === "fade") {
                    slide.classList.toggle("active", i === index);
                }

                slide.setAttribute("aria-hidden", i !== index);
                if (i === index && this.shadowRoot.activeElement !== null) {
                    slide.focus();
                }
            });
        };

        const updateButtons = () => {
            buttons[0].disabled = currentSlide === 0;
            buttons[1].disabled = currentSlide === slides.length - 1;
        };

        goToSlide(currentSlide);
        updateButtons();

        buttons.forEach((button, j) => {
            button.addEventListener("click", () => {
                button.blur();

                const maxIndex = slides.length - 1;
                if (j === 0 && currentSlide > 0) currentSlide--;
                if (j === 1 && currentSlide < maxIndex) currentSlide++;

                goToSlide(currentSlide);
                updateButtons();
            });
        });

        this.shadowRoot.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                if (currentSlide > 0) {
                    currentSlide--;
                    goToSlide(currentSlide);
                    updateButtons();
                }
            }
            if (event.key === "ArrowRight") {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    goToSlide(currentSlide);
                    updateButtons();
                }
            }
        });
    }
}

customElements.define("ui-slider", Slider);
