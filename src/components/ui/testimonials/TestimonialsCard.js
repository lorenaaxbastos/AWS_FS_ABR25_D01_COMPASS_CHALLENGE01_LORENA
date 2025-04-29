import { BaseComponent } from "../../BaseComponent.js";

class TestimonialCard extends BaseComponent {
    static componentFolder = "./src/components/ui/testimonials";

    setupAttributes() {}
}

customElements.define("ui-testimonial-card", TestimonialCard);
