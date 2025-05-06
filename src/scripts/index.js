"use strict";

import { loadPartial } from "../utils/loader.js";
import "../components/components.js";
import { observeSection } from "../shared/section/observeSection.js";
import { observeReadyEvents } from "../shared/section/observeReadyEvents.js";
import { hideSpinner } from "../shared/spinner/Spinner.js";
import { injectSpinners } from "../utils/injectSpinners.js";

const root = document.getElementById("app");

async function initApp() {
    try {
        const layout = await loadPartial("./src/layouts/main-layout.html");
        root.innerHTML = layout;

        const page = await loadPartial("./src/pages/home.html");
        const pageContainer = root.querySelector("#page-content");

        if (pageContainer) {
            pageContainer.innerHTML = page;
        }

        injectSpinners(root);

        setTimeout(() => {
            observeSection(root);
        }, 500);

        observeReadyEvents(hideSpinner);
    } catch (error) {
        console.error(error);
        root.innerHTML = "<p>Algo deu errado...</p>";
    }
}

initApp();
