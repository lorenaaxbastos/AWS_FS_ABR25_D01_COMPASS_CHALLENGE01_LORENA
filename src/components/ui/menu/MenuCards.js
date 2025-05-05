import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { priceFormatBR } from "../../../utils/format.js";

class MenuCards extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }

    static componentName = "MenuCards";

    setupAttributes() {
        this.selectElements();
        this.loadData();
    }

    selectElements() {
        this.container = this.shadowRoot.querySelector(".menu-cards");
    }

    async loadData() {
        const data = await loadPartial(this.getAttribute("data"));
        const productIsNew = data.data.filter((product) => product.is_new);
        this.populateMenuCards(productIsNew);
    }

    formatIngredients(ingredients_ratio) {
        const ingredients = [];
        if (ingredients_ratio) {
            ingredients_ratio.forEach((ingredient) => {
                ingredients.push(
                    `${ingredient.ingredient} ${ingredient.percentage}%`
                );
            });
        }
        return ingredients.join(" | ");
    }

    createMenuCard({
        image_url,
        name,
        ingredients_ratio,
        short_description,
        price,
        order_url,
    }) {
        const menuCard = document.createElement("ui-menu-card");
        menuCard.setAttribute("product-img", image_url || "");
        menuCard.setAttribute("product-name", name);
        menuCard.setAttribute(
            "product-ingredients",
            this.formatIngredients(ingredients_ratio) || short_description
        );
        menuCard.setAttribute("product-price", priceFormatBR(price));
        menuCard.setAttribute("product-url", order_url);
        return menuCard;
    }

    populateMenuCards(products) {
        products.forEach((product) => {
            if (product.name && product.price && product.order_url) {
                const menuCard = this.createMenuCard(product);
                this.container.appendChild(menuCard);
            }
        });
    }
}

customElements.define("ui-menu-cards", MenuCards);
