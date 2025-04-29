import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionForm extends BaseComponent {
    static componentFolder = "./src/components/ui/subscription-form";

    setupAttributes() {}
}

customElements.define("ui-subscription-form", SubscriptionForm);
