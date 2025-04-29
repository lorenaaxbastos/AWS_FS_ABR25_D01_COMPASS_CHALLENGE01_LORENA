import { BaseComponent } from "../../BaseComponent.js";

class Header extends BaseComponent {
    static componentFolder = "./src/components/layout/header";

    setupAttributes() {}
}

customElements.define("site-header", Header);
