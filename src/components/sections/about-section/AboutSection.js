import { BaseComponent } from "../../BaseComponent.js";

class AboutSection extends BaseComponent {
    static componentFolder = "./src/components/sections/about-section";

    setupAttributes() {}
}

customElements.define("section-about", AboutSection);
