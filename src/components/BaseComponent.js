import { loadPartial } from "../utils/loader.js";
import { globalCssLoader } from "../utils/globalCssLoader.js";

export class BaseComponent extends HTMLElement {
    constructor(metaUrl) {
        super();
        this.attachShadow({ mode: "open" });
        this.componentFolder = new URL(".", metaUrl).href;
    }

    async connectedCallback() {
        await this.loadComponent();
        this.setupAttributes();
    }

    async loadComponent() {
        const componentName = this.constructor.componentName;
        const path = `${this.componentFolder}${componentName}`;

        const [html, css] = await Promise.all([
            loadPartial(`${path}.html`),
            loadPartial(`${path}.css`),
        ]);
        const globalCss = await globalCssLoader();

        this.shadowRoot.innerHTML = `<style>${globalCss}</style>
        <style>${css}</style>
        ${html}`;
    }

    setupAttributes() {}
}

customElements.define("base-component", BaseComponent);
