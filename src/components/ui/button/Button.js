import { BaseComponent } from "../../BaseComponent.js";

class Button extends BaseComponent {
    static componentName = "Button";

    constructor() {
        super(import.meta.url);
    }

    setupAttributes() {
        this.selectElements();
        this.setupAttributesForButton();
        this.setupMutationObserver();
    }

    selectElements() {
        this.button = this.shadowRoot.querySelector('[data-role="button"]');
        this.link = this.shadowRoot.querySelector('[data-role="link"]');
    }

    setupAttributesForButton() {
        const isLink = this.hasAttribute("href");
        const element = isLink ? this.link : this.button;
        const other = isLink ? this.button : this.link;

        other.remove();

        this.setLabel(element);
        this.setSize(element);
        this.setAdditionalAttributes(element);
        this.setClassAttributes(element);
    }

    setLabel(element) {
        const label = this.getAttribute("label") || "Order Now";
        element.innerText = label;
    }

    setSize(element) {
        const size = this.getAttribute("size") || "large";
        const fontSizeMap = {
            small: "1.4rem",
            medium: "1.5rem",
            large: "1.6rem",
        };
        element.style.fontSize = fontSizeMap[size] || fontSizeMap["large"];
    }

    setAdditionalAttributes(element) {
        const excludedAttrs = [
            "label",
            "size",
            "shadow-on",
            "outline",
            "on-hover",
            "dark-bg",
        ];
        for (const { name, value } of this.attributes) {
            if (!excludedAttrs.includes(name)) {
                element.setAttribute(name, value);
            }
        }
    }

    setClassAttributes(element) {
        ["shadow-on", "outline", "dark-bg"].forEach((attr) => {
            if (this.hasAttribute(attr)) {
                element.classList.add(attr);
            }
        });

        if (
            this.hasAttribute("on-hover") &&
            this.getAttribute("on-hover") === "animated"
        ) {
            element.classList.add("hover-animated");
        }

        if (this.classList.contains("active")) {
            element.classList.add(
                "btn",
                this.hasAttribute("href") ? "btn--link" : "btn--btn"
            );
        }
    }

    updateOutlineClass(internalButton) {
        if (this.hasAttribute("outline")) {
            internalButton.classList.add("outline");
            internalButton.classList.remove("active");
        } else {
            internalButton.classList.remove("outline");
            internalButton.classList.add("active");
        }
    }

    setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "outline"
                ) {
                    const internalButton = this.shadowRoot.querySelector(
                        '[data-role="button"]'
                    );
                    this.updateOutlineClass(internalButton);
                }
            });
        });

        this.observer.observe(this, {
            attributes: true,
        });
    }

    cleanupMutationObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    disconnectedCallback() {
        this.cleanupMutationObserver();
    }
}

customElements.define("ui-button", Button);
