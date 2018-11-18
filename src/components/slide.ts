import { BaseElement } from '../base-element';
import { html } from 'lit-html';

export default class Slide extends BaseElement {
    slideNum: number;

    constructor() {
        super();
        this.slideNum = this.querySelectorAll('li').length;
    }

    createKeyframe(length: number): string {
        const frame = [];
        for (let index = 1; index < length; index++) {
            frame.push(Math.floor((100 / length) * index));
        }
        return frame
            .map((v, i) => {
                return `${v}% { transform: translate(${(i + 1) * -960}px) }`;
            })
            .join('\n');
    }

    render() {
        return html`
            <style>
            .slide-container {
                width: 960px;
                height: 300px;
                margin: 0 auto;
                overflow: hidden;
            }
            .items {
                display: flex;
                position: relative;
                left: 0;
                width: calc(100% * ${this.slideNum});
                list-style-type: none;
                padding: 0;
                margin: 0;
                animation: slider 20s infinite ease;
            }
            ::slotted(li) {
                position: relative;
                text-align: center;
                width: 960px;
                height: 300px;
                background-color: #eee;
            }
            @keyframes slider {
                0% {
                    transform: translate(0);
                }
                ${this.createKeyframe(this.slideNum)}
                100% {
                    transform: translate(0)
                }
            }
            </style>
            <div class="slide-container">
                <ul class="items">
                    <slot name="item" />
                        <li>default</li>
                    </slot>
                </ul>
            </div>
        `;
    }
}
