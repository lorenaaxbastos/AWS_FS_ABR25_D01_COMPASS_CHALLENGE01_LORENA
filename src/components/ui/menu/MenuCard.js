import { BaseComponent } from "../../BaseComponent.js";
import { priceFormatBR } from "../../../utils/format.js";
import { titleCase } from "../../../utils/format.js";

class MenuCard extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuCard";

    setupAttributes() {
        const card = this.shadowRoot.querySelector(".menu-card");
        const name = this.shadowRoot.querySelector(".menu-card__name");
        const ingredients = this.shadowRoot.querySelector(
            ".menu-card__ingredients"
        );
        const price = this.shadowRoot.querySelector(".menu-card__price");
        const img = this.shadowRoot.querySelector(".menu-card__img");
        const button = this.shadowRoot.querySelector("ui-button");

        [name, ingredients, price].forEach((el) => {
            const key = el.classList.value.split("__")[1];
            const value = this.getAttribute(`product-${key}`);

            el.textContent =
                key === "name"
                    ? titleCase(value)
                    : key === "price"
                    ? priceFormatBR(value)
                    : value;
        });

        const value =
            this.getAttribute("product-img") ||
            "/src/imgs/default-product.webp";
        img.style.backgroundImage = `url(${value})`;
        img.setAttribute(
            "aria-label",
            `Photo of ${name?.textContent || "product"}`
        );

        button.setAttribute("href", this.getAttribute("product-url"));
        button.setAttribute("tabindex", "-1");
        button.removeAttribute("role");

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "link");

        card.addEventListener("click", () => {
            const realButton = button.shadowRoot.querySelector("a");
            window.open(realButton.href, "_self");
        });

        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                card.click();
            }
        });
    }
}

customElements.define("ui-menu-card", MenuCard);
