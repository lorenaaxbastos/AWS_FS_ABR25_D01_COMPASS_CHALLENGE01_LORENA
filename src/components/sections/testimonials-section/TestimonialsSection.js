import { BaseComponent } from "../../BaseComponent.js";

class TestimonialsSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "TestimonialsSection";

    setupAttributes() {}
}

customElements.define("section-testimonials", TestimonialsSection);
