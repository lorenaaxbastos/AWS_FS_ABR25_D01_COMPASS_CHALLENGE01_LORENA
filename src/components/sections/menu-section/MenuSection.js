import { BaseComponent } from "../../BaseComponent.js";

class MenuSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuSection";
}

customElements.define("section-menu", MenuSection);
