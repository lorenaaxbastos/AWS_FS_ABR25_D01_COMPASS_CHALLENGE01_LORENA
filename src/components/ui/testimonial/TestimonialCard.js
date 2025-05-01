import { BaseComponent } from "../../BaseComponent.js";
import { titleCase } from "../../../utils/format.js";

class TestimonialCard extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "TestimonialCard";

    setupAttributes() {
        const feedback = this.shadowRoot.querySelector(
            ".testimonial__feedback"
        );
        const author = this.shadowRoot.querySelector(".testimonial__author");
        const job = this.shadowRoot.querySelector(".testimonial__job");
        const photo = this.shadowRoot.querySelector(".testimonial__photo");

        [author, job, feedback].forEach((el) => {
            const key = el.classList.value.split("__")[1];
            const value = this.getAttribute(key) ?? "";
            el.textContent =
                key === "author" || key === "job" ? titleCase(value) : value;
        });

        photo.style.backgroundImage = `url(${
            this.getAttribute("photo") || "/src/imgs/default-testimonial.webp"
        })`;
        photo.setAttribute("aria-label", `Photo of ${author.textContent}`);

        requestAnimationFrame(() => {
            this.dispatchEvent(
                new CustomEvent("card-ready", {
                    bubbles: true,
                    composed: true,
                })
            );
        });
    }
}

customElements.define("ui-testimonial-card", TestimonialCard);
