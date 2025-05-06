import { BaseSection } from "../../BaseSection.js";

class SubscriptionSection extends BaseSection {
    constructor() {
        super(import.meta.url);
    }
    static sectionName = "SubscriptionSection";
}

customElements.define("section-subscription", SubscriptionSection);
