import { BaseComponent } from "../../BaseComponent.js";

class Nav extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Nav";

    setupAttributes() {}
}

customElements.define("site-nav", Nav);
