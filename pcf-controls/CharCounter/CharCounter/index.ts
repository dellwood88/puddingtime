import { IInputs, IOutputs } from "./generated/ManifestTypes";

type TextBox = HTMLInputElement | HTMLTextAreaElement;

export class CharCounter implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private root!: HTMLDivElement;
    private counter!: HTMLSpanElement;
    private box: TextBox | null = null;
    private notifyOutputChanged!: () => void;

    private value = "";
    private limit: number | null = null;
    private warnAt = 90;
    private multiline: boolean | null = null;
    private counterId = `pud-cc-${Math.random().toString(36).slice(2, 9)}`;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.root = document.createElement("div");
        this.root.className = "pud-charcounter";

        this.counter = document.createElement("span");
        this.counter.className = "pud-charcounter__count";
        this.counter.id = this.counterId;
        this.counter.setAttribute("aria-live", "polite");

        this.root.appendChild(this.counter);
        container.appendChild(this.root);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const p = context.parameters;
        const multiline = p.multiline.raw === true;

        // Swap between <input> and <textarea> when the setting changes.
        if (multiline !== this.multiline || !this.box) {
            this.multiline = multiline;
            this.createBox(multiline);
        }
        const box = this.box as TextBox;

        const columnMax = p.value.attributes?.MaxLength;
        const limit = p.maxLength.raw ?? columnMax ?? null;
        this.limit = limit && limit > 0 ? limit : null;
        this.warnAt = Math.min(Math.max(p.warnAt.raw ?? 90, 1), 100);

        if (this.limit) box.maxLength = this.limit;
        else box.removeAttribute("maxlength");
        box.placeholder = p.placeholder.raw ?? "";
        box.disabled = context.mode.isControlDisabled;
        box.setAttribute("aria-label", p.value.attributes?.DisplayName || "Text");

        // Only overwrite the box when the value changed outside the control,
        // so typing doesn't lose the caret position.
        const incoming = p.value.raw ?? "";
        if (incoming !== this.value) {
            this.value = incoming;
            if (box.value !== incoming) box.value = incoming;
        }
        this.updateCounter();
    }

    public getOutputs(): IOutputs {
        // Empty string clears the column.
        return { value: this.value === "" ? (null as unknown as string) : this.value };
    }

    public destroy(): void {
        this.root.replaceChildren();
    }

    private createBox(multiline: boolean): void {
        const old = this.box;
        const box: TextBox = multiline ? document.createElement("textarea") : document.createElement("input");
        if (box instanceof HTMLInputElement) box.type = "text";
        else box.rows = 4;

        box.className = "pud-charcounter__box";
        box.value = old?.value ?? this.value;
        box.setAttribute("aria-describedby", this.counterId);
        box.addEventListener("input", () => {
            this.value = box.value;
            this.updateCounter();
            this.notifyOutputChanged();
        });

        if (old) old.replaceWith(box);
        else this.root.insertBefore(box, this.counter);
        this.box = box;
    }

    private updateCounter(): void {
        const used = this.value.length;
        this.counter.classList.remove("pud-charcounter__count--warn", "pud-charcounter__count--full");

        if (!this.limit) {
            this.counter.textContent = `${used}`;
            this.counter.title = `${used} characters`;
            return;
        }

        this.counter.textContent = `${used} / ${this.limit}`;
        this.counter.title = `${this.limit - used} characters left`;
        if (used >= this.limit) this.counter.classList.add("pud-charcounter__count--full");
        else if ((used / this.limit) * 100 >= this.warnAt) this.counter.classList.add("pud-charcounter__count--warn");
    }
}
