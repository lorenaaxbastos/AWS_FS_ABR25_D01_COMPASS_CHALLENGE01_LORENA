import { BaseComponent } from "../../BaseComponent.js";

class Button extends BaseComponent {
    static componentFolder = "./src/components/ui/button";
    static componentName = "Button";

    setupAttributes() {
        const isLink = this.hasAttribute("href");
        const button = this.shadowRoot.querySelector('[data-role="button"]');
        const link = this.shadowRoot.querySelector('[data-role="link"]');

        const element = isLink ? link : button;
        const other = isLink ? button : link;

        other.remove();

        const label = this.getAttribute("label") || "Order Now";
        const size = this.getAttribute("size");

        const excludedAttrs = [
            "label",
            "size",
            "shadow-on",
            "outline",
            "on-hover",
        ];
        for (const { name, value } of this.attributes) {
            if (!excludedAttrs.includes(name)) {
                element.setAttribute(name, value);
            }
        }

        element.innerText = label;

        const fontSizeMap = {
            small: "1.4rem",
            medium: "1.5rem",
            large: "1.6rem",
        };

        element.style.fontSize = fontSizeMap[size] || fontSizeMap["large"];

        const attributeClasses = ["shadow-on", "outline"];
        attributeClasses.forEach((attr) => {
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
            element.classList.add("btn", isLink ? "btn--link" : "btn--btn");
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes") {
                    if (mutation.attributeName === "outline") {
                        const internalButton = this.shadowRoot.querySelector(
                            '[data-role="button"]'
                        );
                        if (this.hasAttribute("outline")) {
                            internalButton.classList.add("outline");
                            internalButton.classList.remove("active");
                        } else {
                            internalButton.classList.remove("outline");
                            internalButton.classList.add("active");
                        }
                    }
                }
            });
        });

        observer.observe(this, {
            attributes: true,
        });
    }
}

customElements.define("ui-button", Button);
