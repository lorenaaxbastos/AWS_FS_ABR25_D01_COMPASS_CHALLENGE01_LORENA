import { BaseComponent } from "../../BaseComponent.js";
import { loadPartial } from "../../../utils/loader.js";
import { titleCase } from "../../../utils/format.js";

class Slider extends BaseComponent {
    static componentName = "Slider";

    constructor() {
        super(import.meta.url);
        this.currentSlide = 0;
        this.cardElements = [];
        this.observers = [];
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.startX = 0;
        this.endX = 0;
        this.THRESHOLD = 50;
    }

    async setupAttributes() {
        await this.loadData();
        this.selectElements();
        this.setAriaLabel();
        await this.createSlides();

        this.setSlidesOpacity();
        this.goToSlide();
        this.setupEventListeners();
    }

    async loadData() {
        this.data = await loadPartial(this.getAttribute("data"));
        this.effect = this.getAttribute("effect");
        this.type = this.getAttribute("type");
    }

    selectElements() {
        this.container = this.shadowRoot.querySelector(".slides");
        this.buttons = this.shadowRoot.querySelectorAll(".slider__btn");
    }

    setAriaLabel() {
        const originalLabel = this.container.getAttribute("aria-label");
        this.container.setAttribute(
            "aria-label",
            titleCase(`${this.type} ${originalLabel}`)
        );
    }

    recalculateHeight() {
        const maxHeight = Math.max(
            ...this.cardElements.map((slide) => slide.clientHeight)
        );
        this.container.style.height = `${maxHeight + 55}px`;
    }

    async createSlides() {
        if (this.type === "testimonial") {
            const promises = this.data.data.map((feedback) => {
                return new Promise((resolve) => {
                    const slide = document.createElement("ui-testimonial-card");

                    slide.setAttribute("author", feedback.full_name);
                    slide.setAttribute("job", feedback.profession);
                    slide.setAttribute("photo", feedback.image_url);
                    slide.setAttribute("feedback", feedback.message);
                    slide.setAttribute("tabindex", "-1");

                    slide.addEventListener("card-ready", () => {
                        this.cardElements.push(slide);
                        resolve();
                    });

                    this.container.appendChild(slide);
                });
            });

            await Promise.all(promises);
            this.recalculateHeight();
        }

        this.slides = Array.from(this.container.children);
        this.slidesMaxIndex = this.slides.length - 1;
    }

    setSlidesOpacity() {
        if (this.effect === "fade") {
            this.slides.forEach((slide) => (slide.style.opacity = 0));
        }
    }

    goToSlide() {
        this.slides.forEach((slide, i) => {
            if (this.effect === "slide") {
                slide.style.transform = `translateX(${
                    (i - this.currentSlide) * 100
                }%)`;
            } else if (this.effect === "fade") {
                this.slides.forEach((other) => (other.style.opacity = 0));
                slide.classList.toggle("visible", i === this.currentSlide);
            }

            slide.setAttribute("aria-hidden", i !== this.currentSlide);
        });

        this.updateButtons();
    }

    updateButtons() {
        this.buttons[0].disabled = this.currentSlide === 0;
        this.buttons[1].disabled = this.currentSlide === this.slidesMaxIndex;
    }

    handleButtonClick = (index) => {
        if (index === 0 && this.currentSlide > 0) this.currentSlide--;
        else if (index === 1 && this.currentSlide < this.slidesMaxIndex)
            this.currentSlide++;

        this.goToSlide();
    };

    handleKeydown = (event) => {
        if (event.key === "ArrowLeft" && this.currentSlide > 0) {
            this.currentSlide--;
            this.buttons[0].focus();
        } else if (
            event.key === "ArrowRight" &&
            this.currentSlide < this.slidesMaxIndex
        ) {
            this.currentSlide++;
            this.buttons[1].focus();
        }

        this.goToSlide();
    };

    handleResize() {
        this.cardElements.forEach((slide) => {
            const observer = new ResizeObserver(() => this.recalculateHeight());
            observer.observe(slide);
            this.observers.push(observer);
        });
    }

    handleTouchStart(event) {
        this.startX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
        this.endX = event.touches[0].clientX;
    }

    handleTouchEnd() {
        const deltaX = this.endX - this.startX;

        if (deltaX > this.THRESHOLD && this.currentSlide > 0) {
            this.currentSlide--;
        } else if (
            deltaX < -this.THRESHOLD &&
            this.currentSlide < this.slidesMaxIndex
        ) {
            this.currentSlide++;
        }

        this.goToSlide();
    }

    setupEventListeners() {
        this.handleResize();

        this.buttons.forEach((button, index) => {
            button.addEventListener("click", () =>
                this.handleButtonClick(index)
            );
        });
        this.shadowRoot.addEventListener("keydown", this.handleKeydown);

        this.container.addEventListener("touchstart", this.handleTouchStart);
        this.container.addEventListener("touchmove", this.handleTouchMove);
        this.container.addEventListener("touchend", this.handleTouchEnd);
    }

    cleanupEventListeners() {
        if (this.observers) {
            this.observers.forEach((observer) => observer.disconnect());
        }

        this.buttons.forEach((button, index) => {
            button.removeEventListener("click", () =>
                this.handleButtonClick(index)
            );
        });
        this.shadowRoot.removeEventListener("keydown", this.handleKeydown);

        this.container.removeEventListener("touchstart", this.handleTouchStart);
        this.container.removeEventListener("touchmove", this.handleTouchMove);
        this.container.removeEventListener("touchend", this.handleTouchEnd);
    }

    disconnectedCallback() {
        this.cleanupEventListeners();
    }
}

customElements.define("ui-slider", Slider);
