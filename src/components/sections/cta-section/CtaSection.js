import { BaseComponent } from "../../BaseComponent.js";

class CtaSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "CtaSection";
}

customElements.define("section-cta", CtaSection);
