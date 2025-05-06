import { BaseComponent } from "../../BaseComponent.js";
import { priceFormatUS, titleCase } from "../../../utils/format.js";

class MenuCard extends BaseComponent {
    static componentName = "MenuCard";

    constructor() {
        super(import.meta.url);
    }

    setupAttributes() {
        this.selectElements();
        this.setupCardAttributes();
        this.setupEventListeners();
    }

    selectElements() {
        this.card = this.shadowRoot.querySelector(".menu-card");
        this.name = this.shadowRoot.querySelector(".menu-card__name");
        this.ingredients = this.shadowRoot.querySelector(
            ".menu-card__ingredients"
        );
        this.price = this.shadowRoot.querySelector(".menu-card__price");
        this.img = this.shadowRoot.querySelector(".menu-card__img");
        this.button = this.shadowRoot.querySelector("ui-button");
    }

    setupCardAttributes() {
        [this.name, this.ingredients, this.price].forEach((el) => {
            const key = el.classList.value.split("__")[1];
            const value = this.getAttribute(`product-${key}`);

            el.textContent =
                key === "name"
                    ? titleCase(value)
                    : key === "price"
                    ? priceFormatUS(value)
                    : value;
        });

        const imgUrl =
            this.getAttribute("product-img") ||
            "/src/imgs/default-product.webp";
        this.img.style.backgroundImage = `url(${imgUrl})`;
        this.img.setAttribute(
            "aria-label",
            `Photo of ${this.name?.textContent || "product"}`
        );

        this.button.setAttribute("tabindex", "-1");
        this.button.removeAttribute("role");

        this.card.setAttribute("tabindex", "0");
        this.card.setAttribute("role", "link");
    }

    handleCardClick = () => {
        window.open(this.getAttribute("product-url"), "_self");
        this.card.blur();
    };

    handleCardKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.card.click();
        }
    };

    setupEventListeners() {
        this.card.addEventListener("click", this.handleCardClick);
        this.card.addEventListener("keydown", this.handleCardKeyDown);
    }

    cleanupEventListeners() {
        this.card.removeEventListener("click", this.handleCardClick);
        this.card.removeEventListener("keydown", this.handleCardKeyDown);
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("ui-menu-card", MenuCard);
