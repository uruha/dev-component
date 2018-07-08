import { BaseElement } from '../base-element';
import { html } from 'lit-html/lib/lit-extended';

const ATTR = {
    DATA_COLOR: 'data-color'
};

const color = new WeakMap();

export default class Button extends BaseElement {
    static get observedAttributes() {
        return [ATTR.DATA_COLOR];
    }

    constructor() {
        super();
    }

    attributeChangedCallback(attr: string, prev: any, next: any) {
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

    render() {
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
        </style>
        <button
            type="button"
            class$="${c}"
            on-click="${e => {
                this.onClick(e);
            }}"
        >
            <slot name="label" />
        </button>
        `;
    }

    onClick(e) {
        console.log(e);
    }
}
