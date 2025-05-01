import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionForm extends BaseComponent {
    constructor() {
        super(import.meta.url);
    }
    static componentName = "SubscriptionForm";

    setupAttributes() {
        const EMAIL_KEY = "subscribedEmail";
        const SUBSCRIBE_TEXT = "Subscribe";
        const CANCEL_TEXT = "Cancel subscription";
        const SUCCESS_MESSAGE = "You're now subscribed!";
        const ERROR_MESSAGE = "Oops! The email address you entered is invalid.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = (email) => emailRegex.test(email);

        const btn = this.shadowRoot.querySelector(".subscription__btn");
        const message = this.shadowRoot.querySelector(".subscription__message");
        const input = this.shadowRoot.querySelector(".subscription__input");

        btn.addEventListener("click", () => {
            btn.blur();

            if (btn.classList.contains("subscribed")) {
                localStorage.removeItem(EMAIL_KEY);
                btn.classList.remove("subscribed");
                btn.textContent = SUBSCRIBE_TEXT;
                input.disabled = false;
                input.value = "";
                return;
            }

            const email = input.value.trim();

            if (isValidEmail(email)) {
                localStorage.setItem(EMAIL_KEY, email);
                message.textContent = SUCCESS_MESSAGE;
                input.disabled = true;

                setTimeout(() => {
                    btn.classList.add("subscribed");
                }, 1000);

                setTimeout(() => {
                    btn.textContent = CANCEL_TEXT;
                }, 1200);
            } else {
                message.textContent = ERROR_MESSAGE;
            }

            message.classList.remove("hidden");
            setTimeout(() => message.classList.add("hidden"), 2000);
        });

        const savedEmail = localStorage.getItem(EMAIL_KEY);
        if (savedEmail) {
            input.value = savedEmail;
            input.disabled = true;
            btn.textContent = CANCEL_TEXT;
            btn.classList.add("subscribed");
        }
    }
}

customElements.define("ui-subscription-form", SubscriptionForm);
