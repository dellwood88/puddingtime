import { IInputs, IOutputs } from "./generated/ManifestTypes";

const DEFAULT_COLOR = "#f5b301";

export class StarRating implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private root!: HTMLDivElement;
    private notifyOutputChanged!: () => void;
    private stars: HTMLButtonElement[] = [];

    private value: number | null = null;
    private hover: number | null = null;
    private max = 0;
    private color = DEFAULT_COLOR;
    private disabled = false;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.root = document.createElement("div");
        this.root.className = "pud-star-rating";
        this.root.setAttribute("role", "radiogroup");
        this.root.addEventListener("mouseleave", () => {
            this.hover = null;
            this.paint();
        });
        container.appendChild(this.root);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const p = context.parameters;
        const max = Math.min(Math.max(p.maxStars.raw ?? 5, 1), 10);

        this.color = p.starColor.raw || DEFAULT_COLOR;
        this.disabled = context.mode.isControlDisabled;
        this.value = p.value.raw;
        this.root.setAttribute("aria-label", p.value.attributes?.DisplayName || "Rating");

        if (max !== this.max) {
            this.max = max;
            this.render();
        }
        this.paint();
    }

    public getOutputs(): IOutputs {
        // Returning null clears the bound column.
        return { value: this.value as unknown as number };
    }

    public destroy(): void {
        this.root.replaceChildren();
    }

    private render(): void {
        this.root.replaceChildren();
        this.stars = [];
        for (let i = 1; i <= this.max; i++) {
            const star = document.createElement("button");
            star.type = "button";
            star.className = "pud-star";
            star.textContent = "★";
            star.setAttribute("role", "radio");
            star.setAttribute("aria-label", `${i} of ${this.max}`);
            star.addEventListener("click", () => this.toggle(i));
            star.addEventListener("mouseenter", () => {
                if (!this.disabled) {
                    this.hover = i;
                    this.paint();
                }
            });
            star.addEventListener("keydown", (e) => this.onKeyDown(e));
            this.root.appendChild(star);
            this.stars.push(star);
        }
    }

    private paint(): void {
        const shown = this.hover ?? this.value ?? 0;
        const focusIndex = this.value && this.value <= this.max ? this.value - 1 : 0;

        this.stars.forEach((star, idx) => {
            const n = idx + 1;
            star.style.color = n <= shown ? this.color : "";
            star.classList.toggle("pud-star--filled", n <= shown);
            star.setAttribute("aria-checked", String(n === this.value));
            star.tabIndex = idx === focusIndex ? 0 : -1;
            star.disabled = this.disabled;
        });
    }

    /** Clicking the current rating again clears it. */
    private toggle(n: number): void {
        this.set(n === this.value ? null : n);
    }

    private set(n: number | null): void {
        if (this.disabled || n === this.value) return;
        this.value = n;
        this.hover = null;
        this.paint();
        this.notifyOutputChanged();
    }

    private onKeyDown(e: KeyboardEvent): void {
        const current = this.value ?? 0;
        let next: number | null | undefined;

        switch (e.key) {
            case "ArrowRight":
            case "ArrowUp":
                next = Math.min(current + 1, this.max);
                break;
            case "ArrowLeft":
            case "ArrowDown":
                next = current - 1 > 0 ? current - 1 : null;
                break;
            case "Home":
                next = 1;
                break;
            case "End":
                next = this.max;
                break;
            case "Delete":
            case "Backspace":
            case "0":
                next = null;
                break;
            default:
                if (/^[1-9]$/.test(e.key) && Number(e.key) <= this.max) next = Number(e.key);
        }

        if (next === undefined) return;
        e.preventDefault();
        this.set(next);
        this.stars[next ? next - 1 : 0]?.focus();
    }
}
