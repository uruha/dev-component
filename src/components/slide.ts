import { BaseElement } from '../base-element';
import { html, TemplateResult } from 'lit-html';

const ATTR = {
    DATA_WIDTH: 'data-width',
    DATA_HEIGHT: 'data-height'
};
const width = new WeakMap();
const height = new WeakMap();

export default class Slide extends BaseElement {
    slideNum: number;

    static get observedAttributes(): string[] {
        return [ATTR.DATA_WIDTH, ATTR.DATA_HEIGHT];
    }

    constructor() {
        super();
        this.slideNum = this.querySelectorAll('slide-item').length;
    }

    attributeChangedCallback(attr: string, prev: any, next: any): void {
        if (prev === next) {
            return;
        }
        switch (attr) {
            case ATTR.DATA_WIDTH:
                width.set(this, next);
                break;
            case ATTR.DATA_HEIGHT:
                height.set(this, next);
                break;
            default:
                width.set(this, 960);
                height.set(this, 300);
        }
        if (this.connected) {
            this.update();
        }
    }

    private createKeyframe(length: number, slideWidth: number): string {
        if (!length) {
            return;
        }

        const frame = [];
        for (let i = 1; i < length; i++) {
            frame.push(Math.floor((100 / length) * i));
        }
        return frame
            .map((v, i) => {
                return `${v}% { transform: translate(${(i + 1) *
                    -slideWidth}px) }`;
            })
            .join('\n');
    }

    render(): TemplateResult {
        const { w, h } = {
            w: width.get(this),
            h: height.get(this)
        };
        return html`
            <style>
                .slide-container {
                    width: ${w}px;
                    height: ${h}px;
                    margin: 0 auto;
                    overflow: hidden;
                }
                .slide-items {
                    display: flex;
                    position: relative;
                    left: 0;
                    width: calc(100% * ${this.slideNum});
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    animation: slider 20s infinite ease;
                }
                ::slotted(slide-item) {
                    position: relative;
                    text-align: center;
                    background-color: #eee;
                    width: ${w}px;
                    height: ${h}px;
                }
                @keyframes slider {
                    0% {
                        transform: translate(0);
                    }
                    ${this.createKeyframe(this.slideNum, w)}
                    100% {
                        transform: translate(0);
                    }
                }
            </style>
            <div class="slide-container">
                <ul class="slide-items">
                    <slot>
                        <slide-item>
                            <span name="content">default</span>
                        </slide-item>
                    </slot>
                </ul>
            </div>
        `;
    }
}
