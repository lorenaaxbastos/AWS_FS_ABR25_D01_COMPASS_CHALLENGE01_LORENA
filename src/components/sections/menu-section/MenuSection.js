import { BaseComponent } from "../../BaseComponent.js";

class MenuSection extends BaseComponent {
    static componentFolder = "./src/components/sections/menu-section";
    static componentName = "MenuSection";

    setupAttributes() {}
}

customElements.define("section-menu", MenuSection);
