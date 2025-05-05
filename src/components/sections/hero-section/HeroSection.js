import { BaseComponent } from "../../BaseComponent.js";

class HeroSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "HeroSection";
}

customElements.define("section-hero", HeroSection);
