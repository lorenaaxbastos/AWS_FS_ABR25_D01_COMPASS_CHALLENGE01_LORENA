import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";

class MenuTable extends BaseComponent {
    static componentFolder = "./src/components/ui/menu";
    static componentName = "MenuTable";

    async setupAttributes() {
        const data = await loadPartial(this.getAttribute("data"));

        let filterTags = ["All Items"];
        let tableContent = [];

        data.data.forEach((item) => {
            if (!filterTags.includes(item.type)) filterTags.push(item.type);

            const price = `R$ ${item.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;

            tableContent.push([item.name, item.type, price]);
        });

        const tbody = this.shadowRoot.querySelector(".menu-table__body");
        const filterContainer = this.shadowRoot.querySelector(
            ".menu-table__filter-tags"
        );

        tableContent.forEach((item) => {
            const tr = document.createElement("tr");
            tr.classList.add("menu-table__row");

            item.forEach((text) => {
                const td = document.createElement("td");
                td.classList.add("menu-table__cell");
                td.textContent = text;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        if (filterTags.length <= 1) {
            filterContainer.style.display = "none";
            return;
        }

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

            filterContainer.appendChild(button);
        });

        const buttons = filterContainer.querySelectorAll("ui-button");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                buttons.forEach((button) => {
                    button.classList.remove("active");
                    button.setAttribute("outline", "");
                });
                button.classList.add("active");
                button.removeAttribute("outline");

                const selectedType = button.getAttribute("data-tag");
                const rows = tbody.querySelectorAll("tr");

                rows.forEach((row) => {
                    const typeCell = row.children[1];
                    const isVisible =
                        selectedType === "All Items" ||
                        typeCell.textContent.trim() === selectedType;
                    row.style.display = isVisible ? "" : "none";
                });
            });
        });
    }
}

customElements.define("ui-menu-table", MenuTable);
