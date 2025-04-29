import { BaseComponent } from "../../BaseComponent.js";

class TestimonialsSection extends BaseComponent {
    static componentFolder = "./src/components/sections/testimonials-section";
    static componentName = "TestimonialsSection";

    setupAttributes() {}
}

customElements.define("section-testimonials", TestimonialsSection);
