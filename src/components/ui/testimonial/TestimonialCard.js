import { BaseComponent } from "../../BaseComponent.js";
import { titleCase } from "../../../utils/format.js";

class TestimonialCard extends BaseComponent {
    static componentName = "TestimonialCard";

    constructor() {
        super(import.meta.url);
    }

    setupAttributes() {
        this.selectElements();
        this.populateContent();
        this.setPhoto();
        this.dispatchReadyEvent();
    }

    selectElements() {
        this.feedback = this.shadowRoot.querySelector(".testimonial__feedback");
        this.author = this.shadowRoot.querySelector(".testimonial__author");
        this.job = this.shadowRoot.querySelector(".testimonial__job");
        this.photo = this.shadowRoot.querySelector(".testimonial__photo");
    }

    populateContent() {
        [this.author, this.job, this.feedback].forEach((el) => {
            const key = el.classList.value.split("__")[1];
            const value = this.getAttribute(key) ?? "";
            el.textContent =
                key === "author" || key === "job" ? titleCase(value) : value;
        });
    }

    setPhoto() {
        const photoUrl =
            this.getAttribute("photo") || "/src/imgs/default-testimonial.webp";
        this.photo.style.backgroundImage = `url(${photoUrl})`;
        this.photo.setAttribute(
            "aria-label",
            `Photo of ${this.author.textContent}`
        );
    }

    dispatchReadyEvent() {
        requestAnimationFrame(() => {
            this.dispatchEvent(
                new CustomEvent("card-ready", { bubbles: true, composed: true })
            );
        });
    }
}

customElements.define("ui-testimonial-card", TestimonialCard);
