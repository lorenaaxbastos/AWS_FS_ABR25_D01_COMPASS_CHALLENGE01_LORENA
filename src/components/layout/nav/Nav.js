import { loadPartial } from "../../../utils/loader.js";
import { BaseComponent } from "../../BaseComponent.js";

class Nav extends BaseComponent {
    constructor() {
        super(import.meta.url);
        this.nav = null;
        this.navList = null;
        this.navIcon = null;
    }

    static componentName = "Nav";

    async setupAttributes() {
        await this.loadNavData();
        this.selectElements();
        this.setupEventListeners();
    }

    async loadNavData() {
        this.data = await loadPartial("/src/data/nav.json");
    }

    selectElements() {
        this.nav = this.shadowRoot.querySelector(".nav");
        this.navList = this.shadowRoot.querySelector(".nav__list");
        this.navIcon = this.shadowRoot.querySelector(".nav__icon");
    }

    toggleNav() {
        this.nav.classList.toggle("nav--mobile");
        this.navIcon.classList.toggle("open");
    }

    createNavItem(page) {
        const navItem = `<li class="nav__item"><a class="nav__link" href="${page.path}">${page.label}</a></li>`;
        this.navList.innerHTML += navItem;
    }

    scrollToSection(href) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const header = document
                .querySelector("site-header")
                .shadowRoot.querySelector("header");
            const headerOffset = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerOffset;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    handleLinkClick = (e) => {
        const href = e.target.getAttribute("href");

        if (href.startsWith("#")) {
            e.preventDefault();
            this.scrollToSection(href);
        } else if (href === "/") {
            e.preventDefault();
            this.scrollToTop();
        }
    };

    setupLinkListeners() {
        const links = this.shadowRoot.querySelectorAll(
            '.nav__link[href^="#"], .nav__link[href="/"]'
        );
        links.forEach((link) => {
            link.addEventListener("click", this.handleLinkClick);
        });
    }

    setupEventListeners() {
        this.navIcon.addEventListener("click", this.toggleNav.bind(this));
        this.data.forEach((page) => {
            this.createNavItem(page);
        });

        this.setupLinkListeners();
    }

    cleanupEventListeners() {
        this.navIcon.removeEventListener("click", this.toggleNav);
        const links = this.shadowRoot.querySelectorAll(
            '.nav__link[href^="#"], .nav__link[href="/"]'
        );
        links.forEach((link) => {
            link.removeEventListener("click", this.handleLinkClick);
        });
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("site-nav", Nav);
