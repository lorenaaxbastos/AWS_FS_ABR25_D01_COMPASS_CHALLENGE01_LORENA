import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";

class MenuCards extends BaseComponent {
    static componentFolder = "./src/components/ui/menu";
    static componentName = "MenuCards";

    async setupAttributes() {
        const container = this.shadowRoot.querySelector(".menu-cards");

        const data = await loadPartial(this.getAttribute("data"));
        const productIsNew = data.data.filter((product) => product.is_new);

        productIsNew.forEach(
            ({ imagem_url, name, short_description, price }) => {
                const priceFormatted = `R$ ${price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;

                const img = imagem_url ?? "./src/imgs/product-cappuccino.webp";

                const menuCard = document.createElement("ui-menu-card");
                menuCard.setAttribute("img-src", img);
                menuCard.setAttribute("product-name", name);
                menuCard.setAttribute("product-description", short_description);
                menuCard.setAttribute("product-price", priceFormatted);

                container.appendChild(menuCard);
            }
        );

        const cards = this.shadowRoot.querySelectorAll("ui-menu-card");

        // container.style.width =
        //     cards.length === 1 ? "30%" : cards.length === 2 ? "50%" : "100%";
    }
}

customElements.define("ui-menu-cards", MenuCards);
