import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { priceFormatBR, titleCase } from "../../../utils/format.js";

class MenuTable extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuTable";

    async setupAttributes() {
        const data = await loadPartial(this.getAttribute("data"));

        let filterTags = ["All Items"];
        let tableContent = [];

        (data?.data ?? []).forEach((product) => {
            if (product.name && product.price) {
                if (!filterTags.includes(product.type))
                    filterTags.push(product.type);
                tableContent.push({
                    name: titleCase(product.name),
                    type: titleCase(product.type),
                    price: priceFormatBR(product.price),
                });
            }
        });

        const tbody = this.shadowRoot.querySelector(".menu-table__body");
        const thead = this.shadowRoot.querySelector(".menu-table__head");
        const filtersContainer = this.shadowRoot.querySelector(
            ".menu-table__filter-tags"
        );

        tableContent.forEach((product) => {
            const tr = document.createElement("tr");
            tr.classList.add("menu-table__row");

            Object.keys(product).forEach((key) => {
                const td = document.createElement("td");
                td.classList.add("menu-table__cell");
                td.textContent = product[key];
                td.dataset[key] = product[key];
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        if (filterTags.length <= 1) {
            filtersContainer.style.display = "none";
            return;
        }

        filtersContainer.innerHTML = "";
        filterTags.forEach((tag, index) => {
            const button = document.createElement("ui-button");
            button.setAttribute("label", tag);
            button.setAttribute("data-tag", tag);
            button.setAttribute("size", "small");

            if (index === 0) {
                button.classList.add("active");
            } else {
                button.setAttribute("outline", "");
            }

            filtersContainer.appendChild(button);
        });

        const buttons = filtersContainer.querySelectorAll("ui-button");

        filtersContainer.addEventListener("click", (event) => {
            const btnSelected = event.target.closest("ui-button");
            if (!btnSelected) return;

            buttons.forEach((button) => {
                button.classList.remove("active");
                button.setAttribute("outline", "");
            });
            btnSelected.classList.add("active");
            btnSelected.removeAttribute("outline");

            const typeSelected = btnSelected.getAttribute("data-tag");
            const rows = tbody.querySelectorAll("tr");

            rows.forEach((row) => {
                const typeCell = row.querySelector("[data-type]").textContent;
                const isVisible =
                    typeSelected === "All Items" || typeCell === typeSelected;
                row.style.display = isVisible ? "" : "none";
            });
        });
    }
}

customElements.define("ui-menu-table", MenuTable);
