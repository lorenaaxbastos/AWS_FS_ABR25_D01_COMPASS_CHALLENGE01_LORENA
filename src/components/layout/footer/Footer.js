import { BaseComponent } from "../../BaseComponent.js";

class Footer extends BaseComponent {
    static componentName = "Footer";

    constructor() {
        super(import.meta.url);
    }

    setupAttributes() {
        this.selectElements();
        this.setupEventListeners();
    }

    selectElements() {
        this.logo = this.shadowRoot.querySelector(".logo");
    }

    handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setupEventListeners() {
        if (this.logo) {
            this.logo.addEventListener("click", this.handleLogoClick);
        }
    }

    cleanupEventListeners() {
        if (this.logo) {
            this.logo.removeEventListener("click", this.handleLogoClick);
        }
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("site-footer", Footer);
