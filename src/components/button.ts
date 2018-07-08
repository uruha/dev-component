import { BaseElement } from '../base-element';
import { html } from 'lit-html/lib/lit-extended';

export default class Button extends BaseElement {
    constructor() {
        super();
    }

    render() {
        return html`
        <style>
        button {
            border: none;
            border-radius: 3px;
            padding: 10px 20px;
        }
        </style>
        <button
            type="button"
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
