import { BaseComponent } from "../../BaseComponent.js";

class SubscriptionForm extends BaseComponent {
    static componentName = "SubscriptionForm";

    constructor() {
        super(import.meta.url);
        this.EMAIL_KEY = "subscribedEmail";
        this.SUBSCRIBE_TEXT = "Subscribe";
        this.CANCEL_TEXT = "Cancel subscription";
        this.SUCCESS_MESSAGE = "You're now subscribed!";
        this.ERROR_MESSAGE = "Oops! The email address you entered is invalid.";
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    }

    setupAttributes() {
        this.selectElements();
        this.setupEventListeners();
        this.checkSavedEmail();
    }

    selectElements() {
        this.btn = this.shadowRoot.querySelector(".subscription__btn");
        this.message = this.shadowRoot.querySelector(".subscription__message");
        this.input = this.shadowRoot.querySelector(".subscription__input");
    }

    isValidEmail(email) {
        return this.emailRegex.test(email);
    }

    checkSavedEmail() {
        const savedEmail = localStorage.getItem(this.EMAIL_KEY);
        if (savedEmail) {
            this.input.value = savedEmail;
            this.input.disabled = true;
            this.btn.textContent = this.CANCEL_TEXT;
            this.btn.classList.add("subscribed");
        }
    }

    addSubscription() {
        const email = this.input.value.trim();

        if (this.isValidEmail(email)) {
            localStorage.setItem(this.EMAIL_KEY, email);
            this.message.textContent = this.SUCCESS_MESSAGE;
            this.input.disabled = true;

            setTimeout(() => {
                this.btn.classList.add("subscribed");
            }, 1000);

            setTimeout(() => {
                this.btn.textContent = this.CANCEL_TEXT;
            }, 1200);
        } else {
            this.message.textContent = this.ERROR_MESSAGE;
        }

        this.message.classList.remove("hidden");
        setTimeout(() => this.message.classList.add("hidden"), 2000);
    }

    removeSubscription() {
        localStorage.removeItem(this.EMAIL_KEY);
        this.btn.classList.remove("subscribed");
        this.btn.textContent = this.SUBSCRIBE_TEXT;
        this.input.disabled = false;
        this.input.value = "";
    }

    handleButtonClick = () => {
        this.btn.blur();

        if (this.btn.classList.contains("subscribed")) {
            this.removeSubscription();
        } else {
            this.addSubscription();
        }
    };

    setupEventListeners() {
        this.btn.addEventListener("click", this.handleButtonClick);
    }

    cleanupEventListeners() {
        this.btn.removeEventListener("click", this.handleButtonClick);
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("ui-subscription-form", SubscriptionForm);
