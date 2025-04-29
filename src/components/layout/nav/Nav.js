import { BaseComponent } from "../../BaseComponent.js";

class Nav extends BaseComponent {
    static componentFolder = "./src/components/layout/nav";
    static componentName = "Nav";

    setupAttributes() {}
}

customElements.define("site-nav", Nav);
