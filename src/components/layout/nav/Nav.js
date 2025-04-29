import { BaseComponent } from "../../BaseComponent.js";

class Nav extends BaseComponent {
    static componentFolder = "./src/components/layout/nav";

    setupAttributes() {}
}

customElements.define("site-nav", Nav);
