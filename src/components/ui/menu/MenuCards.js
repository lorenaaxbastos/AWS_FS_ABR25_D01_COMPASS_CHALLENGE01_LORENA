import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";

class MenuCards extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuCards";

    async setupAttributes() {
        const container = this.shadowRoot.querySelector(".menu-cards");

        const data = await loadPartial(this.getAttribute("data"));
        const productIsNew = data.data.filter((product) => product.is_new);

        productIsNew.forEach(
            ({ imagem_url, name, short_description, price, order_url }) => {
                if (name && price && order_url) {
                    const menuCard = document.createElement("ui-menu-card");
                    menuCard.setAttribute("product-img", imagem_url || "");
                    menuCard.setAttribute("product-name", name);
                    menuCard.setAttribute(
                        "product-description",
                        short_description
                    );
                    menuCard.setAttribute("product-price", price);
                    menuCard.setAttribute("product-url", order_url);

                    container.appendChild(menuCard);
                }
            }
        );
    }
}

customElements.define("ui-menu-cards", MenuCards);
