import { BaseSection } from "../../BaseSection.js";

class AboutSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "AboutSection";
}

customElements.define("section-about", AboutSection);
