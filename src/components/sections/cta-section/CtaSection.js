import { BaseComponent } from "../../BaseComponent.js";

class CtaSection extends BaseComponent {
    static componentFolder = "./src/components/sections/cta-section";
    static componentName = "CtaSection";

    setupAttributes() {}
}

customElements.define("section-cta", CtaSection);
