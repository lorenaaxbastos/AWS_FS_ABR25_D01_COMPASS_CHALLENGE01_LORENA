import { BaseComponent } from "../../BaseComponent.js";

class Menu extends BaseComponent {
    static componentFolder = "./src/components/ui/menu";

    setupAttributes() {}
}

customElements.define("ui-menu", Menu);
