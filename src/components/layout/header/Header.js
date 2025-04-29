import { BaseComponent } from "../../BaseComponent.js";

class Header extends BaseComponent {
    static componentFolder = "./src/components/layout/header";
    static componentName = "Header";

    setupAttributes() {}
}

customElements.define("site-header", Header);
