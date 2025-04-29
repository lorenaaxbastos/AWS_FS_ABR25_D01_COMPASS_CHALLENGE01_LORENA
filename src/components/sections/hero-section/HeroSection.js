import { BaseComponent } from "../../BaseComponent.js";

class HeroSection extends BaseComponent {
    static componentFolder = "./src/components/sections/hero-section";

    setupAttributes() {}
}

customElements.define("section-hero", HeroSection);
