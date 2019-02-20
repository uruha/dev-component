import { BaseElement } from '../base-element';
import { html, TemplateResult } from 'lit-html';

export default class SlideItem extends BaseElement {
    render(): TemplateResult {
        return html`
            <style>
                li {
                    width: 100%;
                }
                ::slotted(img) {
                    width: 100%;
                    height: auto;
                }
            </style>
            <li>
                <slot name="content">
                    default
                </slot>
            </li>
        `;
    }
}
