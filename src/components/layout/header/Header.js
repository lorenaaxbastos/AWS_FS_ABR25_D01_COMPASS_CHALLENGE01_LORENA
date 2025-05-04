import { BaseComponent } from "../../BaseComponent.js";

class Header extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "Header";

    setupAttributes() {
        const header = this.shadowRoot.querySelector("header");

        const updateBodyMargin = () => {
            document.body.style.marginTop =
                header.getBoundingClientRect().height + "px";
        };

        if (this.hasAttribute("transparent")) {
            header.classList.add("transparent");
        }

        const isTransparent = () => {
            if (!this.hasAttribute("transparent")) {
                updateBodyMargin();
            }
        };

        const toggleHeaderBg = () => {
            if (window.scrollY > header.getBoundingClientRect().height) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }

            isTransparent();
        };

        isTransparent();

        const resizeObserver = new ResizeObserver(() => {
            isTransparent();
        });
        resizeObserver.observe(header);

        window.addEventListener("scroll", toggleHeaderBg);
        window.addEventListener("resize", isTransparent);
    }
}

customElements.define("site-header", Header);
