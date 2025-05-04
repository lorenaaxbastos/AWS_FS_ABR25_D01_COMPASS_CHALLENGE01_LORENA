import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { priceFormatBR, titleCase } from "../../../utils/format.js";

class MenuTable extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "MenuTable";

    async setupAttributes() {
        const columnsAttr = this.getAttribute("columns");

        let filterTags = ["All Items"];
        let columns = columnsAttr
            ? JSON.parse(columnsAttr)
            : ["name", "type", "price"];

        const data = await loadPartial(this.getAttribute("data"));
        let tableContent = [];

        (data?.data ?? []).forEach((product) => {
            if (product.name && product.price) {
                if (!filterTags.includes(product.type))
                    filterTags.push(product.type);

                tableContent.push(
                    columns.reduce((acc, key) => {
                        let value = product[key];
                        if (key === "price") value = priceFormatBR(value);
                        else
                            value =
                                typeof value === "string"
                                    ? titleCase(value)
                                    : value;

                        acc[key] = value;
                        return acc;
                    }, {})
                );
            }
        });

        const theadRow = this.shadowRoot.querySelector(
            ".menu-table__head .menu-table__row"
        );
        const tbody = this.shadowRoot.querySelector(".menu-table__body");
        const filtersContainer = this.shadowRoot.querySelector(
            ".menu-table__filter-tags"
        );

        const getRows = () => Array.from(tbody.querySelectorAll("tr"));

        const sortRowsByColumn = (rows, index, desc = false) => {
            return rows.sort((a, b) => {
                const valA = a.children[index].textContent.toUpperCase();
                const valB = b.children[index].textContent.toUpperCase();

                if (valA < valB) return desc ? 1 : -1;
                if (valA > valB) return desc ? -1 : 1;
                return 0;
            });
        };

        theadRow.innerHTML = "";

        columns.forEach((col, index) => {
            const th = document.createElement("th");
            th.classList.add("menu-table__cell");
            th.dataset.columnIndex = index;
            th.setAttribute("role", "columnheader");
            th.setAttribute("scope", "col");

            const div = document.createElement("div");
            div.classList.add("menu-table__head-cell-content");
            div.setAttribute("tabindex", "0");
            div.setAttribute("role", "button");
            div.setAttribute("aria-pressed", "false");

            const spanText = document.createElement("span");
            spanText.classList.add("menu-table__head-text");
            spanText.textContent = titleCase(col.split("_").join(" "));

            const icon = document.createElement("span");
            icon.classList.add("menu-table__order-icon");
            icon.innerHTML = "&#9650;";

            if (index === 0) icon.classList.add("active");

            div.appendChild(spanText);
            div.appendChild(icon);
            th.appendChild(div);
            theadRow.appendChild(th);

            div.addEventListener("click", () => {
                const selectedIcon = div.querySelector(
                    ".menu-table__order-icon"
                );

                theadRow
                    .querySelectorAll(".menu-table__head-cell-content")
                    .forEach((otherDiv) => {
                        const otherIcon = otherDiv.querySelector(
                            ".menu-table__order-icon"
                        );
                        if (otherDiv !== div) {
                            otherIcon.classList.remove(
                                "active",
                                "active--desc"
                            );
                        }
                        otherDiv.setAttribute("aria-pressed", "false");
                    });

                div.setAttribute("aria-pressed", "true");
                selectedIcon.classList.add("active");
                selectedIcon.classList.toggle("active--desc");

                const desc = selectedIcon.classList.contains("active--desc");
                th.setAttribute("aria-sort", desc ? "descending" : "ascending");

                const sortedRows = sortRowsByColumn(getRows(), index, desc);
                sortedRows.forEach((row) => tbody.appendChild(row));
            });

            div.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    div.click();
                }
            });
        });

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

        const sortedRows = sortRowsByColumn(getRows(), 0);
        sortedRows.forEach((row) => tbody.appendChild(row));

        if (filterTags.length <= 1) {
            filtersContainer.style.display = "none";
            return;
        }

        filtersContainer.innerHTML = "";
        filterTags.forEach((tag, index) => {
            const button = document.createElement("ui-button");
            button.setAttribute("label", tag);
            button.setAttribute("data-tag", tag);
            button.setAttribute("data-role", "button");
            button.setAttribute("size", "medium");

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
                button.setAttribute("aria-pressed", "false");
            });
            btnSelected.classList.add("active");
            btnSelected.removeAttribute("outline");
            btnSelected.setAttribute("aria-pressed", "true");

            const typeSelected = btnSelected.getAttribute("data-tag");

            getRows().forEach((row) => {
                const typeCell = row.querySelector("[data-type]").textContent;
                const isVisible =
                    typeSelected === "All Items" || typeCell === typeSelected;
                row.style.display = isVisible ? "" : "none";
            });
        });
    }
}

customElements.define("ui-menu-table", MenuTable);
