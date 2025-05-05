import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionSection extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "SubscriptionSection";
}

customElements.define("section-subscription", SubscriptionSection);
