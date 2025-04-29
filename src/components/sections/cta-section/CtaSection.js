import { BaseComponent } from "../../BaseComponent.js";

class CtaSection extends BaseComponent {
    static componentFolder = "./src/components/sections/cta-section";

    setupAttributes() {}
}

customElements.define("section-cta", CtaSection);
