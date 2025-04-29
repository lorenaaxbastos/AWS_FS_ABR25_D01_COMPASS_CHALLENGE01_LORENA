import { BaseComponent } from "../../BaseComponent.js";

class MenuSection extends BaseComponent {
    static componentFolder = "./src/components/sections/menu-section";

    setupAttributes() {}
}

customElements.define("section-menu", MenuSection);
