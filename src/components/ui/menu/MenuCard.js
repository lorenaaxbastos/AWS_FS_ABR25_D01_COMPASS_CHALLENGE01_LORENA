import { BaseComponent } from "../../BaseComponent.js";

class MenuCard extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuCard";

    setupAttributes() {
        const imgSrc = this.getAttribute("img-src");
        const imgElement = this.shadowRoot.querySelector(".menu-card__image");
        imgElement.style.backgroundImage = `url(${imgSrc})`;

        const productName = this.getAttribute("product-name");
        imgElement.ariaLabel = `Photo of ${productName}`;

        const productNameElement =
            this.shadowRoot.querySelector(".menu-card__title");
        productNameElement.textContent = productName;

        const productDescription = this.getAttribute("product-description");
        const productDescriptionElement = this.shadowRoot.querySelector(
            ".menu-card__description"
        );
        productDescriptionElement.textContent = productDescription;

        const productPrice = this.getAttribute("product-price");
        const productPriceElement =
            this.shadowRoot.querySelector(".menu-card__price");
        productPriceElement.textContent = productPrice;
    }
}

customElements.define("ui-menu-card", MenuCard);
