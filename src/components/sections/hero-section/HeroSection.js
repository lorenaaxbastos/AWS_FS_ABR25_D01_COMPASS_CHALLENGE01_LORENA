import { BaseSection } from "../../BaseSection.js";

class HeroSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "HeroSection";
}

customElements.define("section-hero", HeroSection);
