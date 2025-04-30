import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionForm extends BaseComponent {
    static componentFolder = "./src/components/ui/subscription-form";
    static componentName = "SubscriptionForm";

    setupAttributes() {
        const EMAIL_KEY = "subscribedEmail";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = (email) => emailRegex.test(email);

        const btn = this.shadowRoot.querySelector(".subscription__btn");
        const message = this.shadowRoot.querySelector(".subscription__message");
        const input = this.shadowRoot.querySelector(".subscription__input");

        btn.addEventListener("click", () => {
            btn.blur();

            if (btn.textContent === "Cancel subscription") {
                localStorage.removeItem(EMAIL_KEY);
                btn.classList.remove("subscribed");
                btn.textContent = "Subscribe";
                input.disabled = false;
                input.value = "";
                return;
            }

            const email = input.value.trim();

            if (isValidEmail(email)) {
                localStorage.setItem(EMAIL_KEY, email);
                message.textContent = "You're now subscribed!";
                input.disabled = true;

                setTimeout(() => {
                    btn.classList.add("subscribed");
                }, 1000);

                setTimeout(() => {
                    btn.textContent = "Cancel subscription";
                }, 1200);
            } else {
                message.textContent =
                    "Oops! The email address you entered is invalid.";
            }

            message.classList.remove("hidden");
            setTimeout(() => message.classList.add("hidden"), 2000);
        });

        const savedEmail = localStorage.getItem(EMAIL_KEY);
        if (savedEmail) {
            input.value = savedEmail;
            input.disabled = true;
            btn.textContent = "Cancel subscription";
            btn.classList.add("subscribed");
        }
    }
}

customElements.define("ui-subscription-form", SubscriptionForm);
