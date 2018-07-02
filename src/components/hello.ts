import { BaseElement } from '../base-element';
import { html } from 'lit-html/lib/lit-extended';

const ATTR = {
    DATA_NAME: 'data-name'
};

const name = new WeakMap();

export default class Hello extends BaseElement {
    static get observedAttributes() {
        return [ATTR.DATA_NAME];
    }

    constructor() {
        super();
    }

    attributeChangedCallback(attr: string, prev: any, next: any) {
        if (prev === next) {
            return;
        }
        switch (attr) {
            case ATTR.DATA_NAME:
                name.set(this, next);
                break;
            default:
        }
        if (this.connected) {
            this.update();
        }
    }

    render() {
        const { n } = { n: name.get(this) };
        return html`
        <style>
        div {
            padding: 14px;
            margin: 0;
            color: #4d4398;
        }
        </style>
        <div>
            Hello ${n}
        </div>
        `;
    }
}
