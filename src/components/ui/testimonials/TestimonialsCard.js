import { BaseComponent } from "../../BaseComponent.js";

class TestimonialCard extends BaseComponent {
    static componentFolder = "./src/components/ui/testimonials";
    static componentName = "TestimonialCard";

    setupAttributes() {}
}

customElements.define("ui-testimonial-card", TestimonialCard);
