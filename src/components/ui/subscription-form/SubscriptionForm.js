import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionForm extends BaseComponent {
    static componentFolder = "./src/components/ui/subscription-form";
    static componentName = "SubscriptionForm";

    setupAttributes() {}
}

customElements.define("ui-subscription-form", SubscriptionForm);
