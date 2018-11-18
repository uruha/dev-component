import { render, TemplateResult } from 'lit-html';

const connected = new WeakMap();

export class BaseElement extends HTMLElement {
    get connected() {
        return connected.get(this);
    }

    connectedCallback(update: boolean = true) {
        connected.set(this, true);
        if (update) {
            this.update();
        }
    }

    disconnectedCallback() {
        connected.delete(this);
    }

    private _render(template: TemplateResult) {
        render(
            template,
            this.shadowRoot || this.attachShadow({ mode: 'open' })
        );
        this.renderedCallback();
    }

    protected update() {
        const template = this.render();
        if (template) {
            this._render(template);
        }
    }

    protected render(): TemplateResult {
        throw new Error('Render function not Implemented');
    }

    protected renderedCallback() {
        // Empty
    }
}
