import { BaseComponent } from "../../BaseComponent.js";

class Header extends BaseComponent {
    static componentName = "Header";

    constructor() {
        super(import.meta.url);
        this.resizeObserver = null;
    }

    setupAttributes() {
        this.selectElements();
        this.initHeaderTransparency();
        this.observeResize();
        this.setupEventListeners();
    }

    selectElements() {
        this.header = this.shadowRoot.querySelector("header");
        this.logo = this.shadowRoot.querySelector(".logo");
    }

    initHeaderTransparency() {
        if (this.hasAttribute("transparent")) {
            this.header.classList.add("transparent");
        } else {
            this.updateBodyMargin();
        }
    }

    updateBodyMargin() {
        const height = this.header.getBoundingClientRect().height;
        document.body.style.marginTop = `${height}px`;
    }

    handleScroll = () => {
        const scrollY = window.scrollY;
        const headerHeight = this.header.getBoundingClientRect().height;

        if (scrollY > headerHeight) {
            this.header.classList.add("scroll");
        } else {
            this.header.classList.remove("scroll");
        }

        if (!this.hasAttribute("transparent")) {
            this.updateBodyMargin();
        }
    };

    observeResize() {
        this.resizeObserver = new ResizeObserver(() => {
            if (!this.hasAttribute("transparent")) {
                this.updateBodyMargin();
            }
        });
        this.resizeObserver.observe(this.header);
    }

    handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    setupEventListeners() {
        window.addEventListener("scroll", this.handleScroll);
        this.logo.addEventListener("click", this.handleLogoClick);
    }

    cleanupEventListeners() {
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("resize", this.updateBodyMargin.bind(this));
        this.logo.removeEventListener("click", this.handleLogoClick);
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("site-header", Header);
