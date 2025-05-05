import { BaseComponent } from "../../BaseComponent.js";

class AboutSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "AboutSection";
}

customElements.define("section-about", AboutSection);
