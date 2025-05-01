import { BaseComponent } from "../../BaseComponent.js";

class HeroSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "HeroSection";

    setupAttributes() {}
}

customElements.define("section-hero", HeroSection);
