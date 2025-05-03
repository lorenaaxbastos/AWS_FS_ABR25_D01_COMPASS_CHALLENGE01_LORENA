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

        const toggleHeaderBg = () => {
            if (window.scrollY > header.getBoundingClientRect().height) {
                header.classList.add("scroll");
            } else {
                header.classList.remove("scroll");
            }

            // ✅ Garante que o updateBodyMargin aconteça na próxima renderização
            requestAnimationFrame(updateBodyMargin);
        };

        if (!this.hasAttribute("transparent")) {
            // define inicialmente
            updateBodyMargin();
        }

        window.addEventListener("scroll", toggleHeaderBg);
        window.addEventListener("resize", updateBodyMargin);
    }
}

customElements.define("site-header", Header);
