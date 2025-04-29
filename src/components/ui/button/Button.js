import { BaseComponent } from "../../BaseComponent.js";

class Button extends BaseComponent {
    static componentFolder = "./src/components/ui/button";

    setupAttributes() {}
}

customElements.define("ui-button", Button);
