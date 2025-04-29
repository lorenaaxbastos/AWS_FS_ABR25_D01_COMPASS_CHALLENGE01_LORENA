import { loadPartial } from "../utils/loader.js";
import { globalCssLoader } from "../utils/globalCssLoader.js";

export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        await this.loadComponent();
        this.setupAttributes();
    }

    async loadComponent() {
        const { componentFolder, componentName } = this.constructor;
        const path = `${componentFolder}/${componentName}`;

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
