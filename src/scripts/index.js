"use strict";

import { loadPartial } from "../utils/loader.js";
import { showSpinner, hideSpinner } from "../shared/spinner/Spinner.js";
import "../components/components.js";

const root = document.getElementById("app");

async function initApp() {
    try {
        showSpinner();

        const layout = await loadPartial("./src/layouts/main-layout.html");
        root.innerHTML = layout;

        const page = await loadPartial("./src/pages/home.html");
        const pageContainer = root.querySelector("#page-content");

        // HIDE
        await new Promise((resolve) => setTimeout(resolve, 5000));

        if (pageContainer) {
            pageContainer.innerHTML = page;
        }
    } catch (error) {
        console.error(error);
        root.innerHTML = "<p>Algo deu errado...</p>";
    } finally {
        hideSpinner();
    }
}

initApp();
