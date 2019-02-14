import { render, TemplateResult } from 'lit-html';

const connected = new WeakMap();

export class BaseElement extends HTMLElement {
    /**
     * @TODO elucidate connected type
     */
    get connected(): any {
        return connected.get(this);
    }

    connectedCallback(update = true): void {
        connected.set(this, true);
        if (update) {
            this.update();
        }
    }

    disconnectedCallback(): void {
        connected.delete(this);
    }

    private _render(template: TemplateResult): void {
        render(
            template,
            this.shadowRoot || this.attachShadow({ mode: 'open' })
        );
        this.renderedCallback();
    }

    protected update(): void {
        const template = this.render();
        if (template) {
            this._render(template);
        }
    }

    protected render(): TemplateResult {
        throw new Error('Render function not Implemented');
    }

    protected renderedCallback(): void {
        // Empty
    }
}
