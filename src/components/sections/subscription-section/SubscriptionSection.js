import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionSection extends BaseComponent {
    static componentFolder = "./src/components/sections/subscription-section";
    static componentName = "SubscriptionSection";

    setupAttributes() {}
}

customElements.define("section-subscription", SubscriptionSection);
