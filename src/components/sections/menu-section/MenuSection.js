import { BaseSection } from "../../BaseSection.js";

class MenuSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "MenuSection";
}

customElements.define("section-menu", MenuSection);
