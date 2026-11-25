import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ProgressBar implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private root!: HTMLDivElement;
    private track!: HTMLDivElement;
    private fill!: HTMLDivElement;
    private label!: HTMLSpanElement;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.root = document.createElement("div");
        this.root.className = "pud-progress";

        this.track = document.createElement("div");
        this.track.className = "pud-progress__track";
        this.track.setAttribute("role", "progressbar");
        this.track.setAttribute("aria-valuemin", "0");
        this.track.setAttribute("aria-valuemax", "100");

        this.fill = document.createElement("div");
        this.fill.className = "pud-progress__fill";
        this.track.appendChild(this.fill);

        this.label = document.createElement("span");
        this.label.className = "pud-progress__label";

        this.root.append(this.track, this.label);
        container.appendChild(this.root);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const p = context.parameters;
        const value = p.value.raw;
        const max = p.maxValue.raw && p.maxValue.raw > 0 ? p.maxValue.raw : 100;
        const pct = value === null ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
        const complete = value !== null && value >= max;

        this.fill.style.width = `${pct}%`;
        this.fill.style.backgroundColor =
            complete && p.completeColor.raw ? p.completeColor.raw : p.barColor.raw || "#0f6cbd";

        const text = value === null ? "—" : `${Math.round(pct)}%`;
        this.label.textContent = text;
        this.label.style.display = p.showLabel.raw === false ? "none" : "";

        this.track.setAttribute("aria-valuenow", String(Math.round(pct)));
        this.track.setAttribute("aria-valuetext", value === null ? "No value" : `${text} (${value} of ${max})`);
        this.track.setAttribute("aria-label", p.value.attributes?.DisplayName || "Progress");
        this.root.title = value === null ? "" : `${p.value.formatted ?? value} of ${max}`;
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        this.root.replaceChildren();
    }
}
