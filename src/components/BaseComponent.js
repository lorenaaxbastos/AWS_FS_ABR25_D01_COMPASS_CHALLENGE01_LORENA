import { loadPartial } from "../utils/loader.js";

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
        const basePath = this.constructor.componentFolder;
        const baseName = basePath
            .split("/")
            .pop()
            .split("-")
            .map((str) => str[0].toUpperCase() + str.slice(1, str.length))
            .join("");

        const htmlPath = `${basePath}/${baseName}.html`;
        const cssPath = `${basePath}/${baseName}.css`;

        const html = await loadPartial(htmlPath);
        const style = await loadPartial(cssPath);

        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            ${html}
        `;
    }

    setupAttributes() {}
}
