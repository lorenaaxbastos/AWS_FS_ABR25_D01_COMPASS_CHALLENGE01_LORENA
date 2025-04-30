import { BaseComponent } from "../../BaseComponent.js";

class TestimonialCard extends BaseComponent {
    static componentFolder = "./src/components/ui/testimonial";
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
            el.textContent = this.getAttribute(key);
        });

        photo.style.backgroundImage = `url(${this.getAttribute("photo")})`;

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
