import { BaseComponent } from "../../BaseComponent.js";

class TestimonialsSection extends BaseComponent {
    static componentFolder = "./src/components/sections/testimonials-section";

    setupAttributes() {}
}

customElements.define("section-testimonials", TestimonialsSection);
