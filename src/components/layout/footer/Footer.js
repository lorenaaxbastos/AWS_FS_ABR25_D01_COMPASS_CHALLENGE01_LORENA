import { BaseComponent } from "../../BaseComponent.js";

class Footer extends BaseComponent {
    static componentFolder = "./src/components/layout/footer";

    setupAttributes() {}
}

customElements.define("site-footer", Footer);
