import { BaseSection } from "../../BaseSection.js";

class CtaSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "CtaSection";
}

customElements.define("section-cta", CtaSection);
