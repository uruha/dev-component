import { BaseElement } from '../base-element';
import { html, TemplateResult } from 'lit-html';

const ATTR = {
    DATA_COLOR: 'data-color'
};

const color = new WeakMap();

export default class Button extends BaseElement {
    static get observedAttributes(): string[] {
        return [ATTR.DATA_COLOR];
    }

    constructor() {
        super();
    }

    attributeChangedCallback(attr: string, prev: any, next: any): void {
        if (prev === next) {
            return;
        }
        switch (attr) {
            case ATTR.DATA_COLOR:
                color.set(this, next);
                break;
            default:
        }
        if (this.connected) {
            this.update();
        }
    }

    render(): TemplateResult {
        const { c } = { c: color.get(this) };
        return html`
            <style>
                button {
                    border: none;
                    border-radius: 3px;
                    padding: 10px 20px;
                }
                .pink {
                    background-color: #ea618e;
                }
                .green {
                    background-color: #2cb4ad;
                }
            </style>
            <button type="button" class="${c}" @click="${this.onClick}">
                <slot name="label" />
            </button>
        `;
    }

    onClick(e): void {
        console.log(e);
    }
}
