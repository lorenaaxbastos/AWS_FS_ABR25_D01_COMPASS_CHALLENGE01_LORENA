import { BaseComponent } from "../../BaseComponent.js";

class TestimonialSlider extends BaseComponent {
    static componentFolder = "./src/components/ui/testimonials";
    static componentName = "TestimonialSlider";

    setupAttributes() {}
}

customElements.define("ui-testimonial-slider", TestimonialSlider);
