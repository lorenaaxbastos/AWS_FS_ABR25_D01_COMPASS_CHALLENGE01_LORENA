import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { priceFormatUS, titleCase } from "../../../utils/format.js";

class MenuTable extends BaseComponent {
    static componentName = "MenuTable";

    constructor() {
        super(import.meta.url);
        this.columns = [];
        this.filterTags = ["All Items"];
        this.tableContent = [];
        this.boundHandleFilterClick = this.handleFilterClick.bind(this);
        this.boundHandleSortKeydown = this.handleSortKeydown.bind(this);
        this.boundHeaderClickHandlers = new Map();
    }

    async setupAttributes() {
        await this.setupColumns();
        await this.setupData();
        this.selectElements();
        this.renderTable();
        this.setupFilterButtonEventListeners();
    }

    selectElements() {
        this.theadRow = this.shadowRoot.querySelector(
            ".menu-table__head .menu-table__row"
        );
        this.tbody = this.shadowRoot.querySelector(".menu-table__body");
        this.filtersContainer = this.shadowRoot.querySelector(
            ".menu-table__filter-tags"
        );
    }

    async setupColumns() {
        const columnsAttr = this.getAttribute("columns");
        if (columnsAttr) {
            this.columns = JSON.parse(columnsAttr);
            this.columnsWithTypeForFilter = this.columns.includes("type")
                ? [...this.columns]
                : [...this.columns, "type"];
        } else {
            this.columns = ["name", "type", "price"];
            this.columnsWithTypeForFilter = [...this.columns];
        }
    }

    async setupData() {
        const data = await loadPartial(this.getAttribute("data"));
        data?.data?.forEach((product) => this.processProduct(product));
    }

    processProduct(product) {
        const productType = product.type ?? "";
        if (product.name && product.price) {
            if (!this.filterTags.includes(productType)) {
                this.filterTags.push(productType);
            }

            const processedProduct = this.columns.reduce((acc, key) => {
                let value = product[key];
                if (key === "price") value = priceFormatUS(value);
                if (key === "type" && value == null) value = "";
                acc[key] = value;
                return acc;
            }, {});

            processedProduct.type = productType;
            this.tableContent.push(processedProduct);
        }
    }

    renderFilterTags() {
        if (this.filterTags.length <= 1) {
            this.filtersContainer.style.display = "none";
            return;
        }

        this.filtersContainer.innerHTML = "";
        this.filterTags.forEach((tag, index) => {
            const button = this.createFilterButton(tag, index);
            this.filtersContainer.appendChild(button);
        });
    }

    renderTable() {
        this.clearHeaderListeners();
        this.renderTableHeaders();
        this.renderTableRows();
        this.renderFilterTags();
        this.sortRows();
    }

    renderTableHeaders() {
        this.theadRow.innerHTML = "";
        this.columns.forEach((col, index) => {
            const th = this.createHeaderCell(col, index);
            this.theadRow.appendChild(th);
        });
    }

    renderTableRows() {
        this.tbody.innerHTML = "";
        this.tableContent.forEach((product) => {
            const tr = document.createElement("tr");
            tr.classList.add("menu-table__row");
            const rowType = product.type ?? "";
            tr.dataset.type = rowType;
            this.columns.forEach((col) => {
                const td = this.createRowCell(product[col], col);
                tr.appendChild(td);
            });
            this.tbody.appendChild(tr);
        });
    }

    createFilterButton(tag, index) {
        const button = document.createElement("ui-button");
        button.setAttribute("label", tag);
        button.setAttribute("data-tag", tag);
        button.setAttribute("data-role", "button");
        button.setAttribute("size", "medium");
        if (index === 0) button.classList.add("active");
        else button.setAttribute("outline", "");
        return button;
    }

    createHeaderCell(col, index) {
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

        const boundClick = () => this.handleSortClick(div, icon, index);
        div.addEventListener("click", boundClick);
        div.addEventListener("keydown", this.boundHandleSortKeydown);

        this.boundHeaderClickHandlers.set(div, boundClick);

        return th;
    }

    createRowCell(value, key) {
        const td = document.createElement("td");
        td.classList.add("menu-table__cell");
        td.textContent = value;
        td.dataset[key] = value;
        return td;
    }

    resetSortIcons(div) {
        this.theadRow
            .querySelectorAll(".menu-table__head-cell-content")
            .forEach((otherDiv) => {
                const otherIcon = otherDiv.querySelector(
                    ".menu-table__order-icon"
                );
                if (otherDiv !== div)
                    otherIcon.classList.remove("active", "active--desc");
                otherDiv.setAttribute("aria-pressed", "false");
            });
    }

    getRows() {
        return Array.from(this.tbody.querySelectorAll("tr"));
    }

    filterRowsByType(typeSelected) {
        this.getRows().forEach((row) => {
            const rowType = row.dataset.type ?? "";
            const isVisible =
                typeSelected === "All Items" || rowType === typeSelected;
            row.style.display = isVisible ? "" : "none";
        });
    }

    sortRows() {
        const sortedRows = this.sortRowsByColumn(this.getRows(), 0);
        sortedRows.forEach((row) => this.tbody.appendChild(row));
    }

    sortRowsByColumn(rows, index, desc = false) {
        return rows.sort((a, b) => {
            const valA = a.children[index].textContent.toUpperCase();
            const valB = b.children[index].textContent.toUpperCase();
            if (valA < valB) return desc ? 1 : -1;
            if (valA > valB) return desc ? -1 : 1;
            return 0;
        });
    }

    handleSortClick(div, icon, index) {
        this.resetSortIcons(div);
        div.setAttribute("aria-pressed", "true");
        icon.classList.add("active");
        icon.classList.toggle("active--desc");
        const desc = icon.classList.contains("active--desc");
        div.setAttribute("aria-sort", desc ? "descending" : "ascending");
        const sortedRows = this.sortRowsByColumn(this.getRows(), index, desc);
        sortedRows.forEach((row) => this.tbody.appendChild(row));
    }

    handleSortKeydown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.target.click();
        }
    }

    handleFilterClick(event) {
        const btnSelected = event.target.closest("ui-button");
        if (!btnSelected) return;

        const buttons = this.filtersContainer.querySelectorAll("ui-button");
        buttons.forEach((button) => {
            button.classList.remove("active");
            button.setAttribute("outline", "");
            button.setAttribute("aria-pressed", "false");
        });

        btnSelected.classList.add("active");
        btnSelected.removeAttribute("outline");
        btnSelected.setAttribute("aria-pressed", "true");

        const typeSelected = btnSelected.getAttribute("data-tag");
        this.filterRowsByType(typeSelected);
    }

    setupFilterButtonEventListeners() {
        this.filtersContainer.addEventListener(
            "click",
            this.boundHandleFilterClick
        );
    }

    clearHeaderListeners() {
        this.boundHeaderClickHandlers.forEach((clickHandler, div) => {
            div.removeEventListener("click", clickHandler);
            div.removeEventListener("keydown", this.boundHandleSortKeydown);
        });
        this.boundHeaderClickHandlers.clear();
    }

    disconnectedCallback() {
        this.filtersContainer.removeEventListener(
            "click",
            this.boundHandleFilterClick
        );
        this.clearHeaderListeners();
    }
}

customElements.define("ui-menu-table", MenuTable);
