import { loadPartial } from "../../../utils/loader.js";
import { BaseComponent } from "../../BaseComponent.js";

class Nav extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Nav";

    async setupAttributes() {
        const data = await loadPartial("/src/data/nav.json");
        const nav = this.shadowRoot.querySelector(".nav");
        const navList = this.shadowRoot.querySelector(".nav__list");
        const nav__icon = this.shadowRoot.querySelector(".nav__icon");

        data.forEach((page) => {
            const navItem = `<li class="nav__item"><a class="nav__link" href="${page.path}">${page.label}</a></li>`;
            navList.innerHTML += navItem;
        });

        nav__icon.addEventListener("click", () => {
            nav.classList.toggle("nav--mobile");
            nav__icon.classList.toggle("open");
        });
    }
}

customElements.define("site-nav", Nav);
