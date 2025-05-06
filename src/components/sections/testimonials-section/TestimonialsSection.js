import { BaseSection } from "../../BaseSection.js";

class TestimonialsSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "TestimonialsSection";
}

customElements.define("section-testimonials", TestimonialsSection);
