import { BaseComponent } from "../../BaseComponent.js";

class Header extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Header";

    setupAttributes() {}
}

customElements.define("site-header", Header);
