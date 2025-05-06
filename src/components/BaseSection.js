import { loadPartial } from "../utils/loader.js";
import { globalCssLoader } from "../utils/globalCssLoader.js";

export class BaseSection extends HTMLElement {
    constructor(metaUrl) {
        super();
        this.attachShadow({ mode: "open" });
        this.sectionFolder = new URL(".", metaUrl).href;
    }

    async connectedCallback() {
        await this.loadSection();

        this.dispatchEvent(
            new CustomEvent("ready", { bubbles: true, composed: true })
        );
    }

    async loadSection() {
        const sectionName = this.constructor.sectionName;
        const path = `${this.sectionFolder}${sectionName}`;

        const [html, css] = await Promise.all([
            loadPartial(`${path}.html`),
            loadPartial(`${path}.css`),
        ]);
        const globalCss = await globalCssLoader();

        this.shadowRoot.innerHTML = `
            <style>${globalCss}</style>
            <style>${css}</style>
            ${html}
        `;
    }
}
