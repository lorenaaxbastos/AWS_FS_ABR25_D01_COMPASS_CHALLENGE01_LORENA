import { BaseComponent } from "../../BaseComponent.js";

class Footer extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Footer";

    setupAttributes() {}
}

customElements.define("site-footer", Footer);
