export class VisualViewport extends HTMLElement {
    static defaultTagName = 'visual-viewport';

    static register(tagName) {
        tagName = tagName || this.defaultTagName;

        if ("customElements" in window && !customElements.get(tagName)) {
            customElements.define(tagName, VisualViewport);
        }
    }

    css = `
        :host {
            --color-foreground: light-dark(black, white);
            --color-background: light-dark(white, black);
            --border-radius: 0;
            --offset: calc(1rem / var(--vvd-scale));

            box-sizing: border-box;
            position: fixed;
            margin: auto;
            width: max-content;
            align-content: center;
            text-align: center;
            scale: calc(1 / var(--vvd-scale));

            font-family: monospace;
            color: black;
            display: grid;
            background: var(--color-background);
            border-radius: var(--border-radius);
            border: 1px solid var(--color-foreground);
            box-shadow: 3px 3px 0 0 var(--color-foreground);
            transition: all 0.1s;

            *, *::before, *::after {
                box-sizing: border-box;
            }
        }

        :host(.top-left) {
            top: calc(var(--vvd-offsetTop) * 1px);
            left: calc(var(--vvd-offsetLeft) * 1px);
            transform-origin: top left;
            translate: var(--offset) var(--offset);
        }

        :host(.top-center) {
            top: calc(var(--vvd-offsetTop) * 1px);
            left: calc(1px * ((var(--vvd-width) / 2) + var(--vvd-offsetLeft)));
            transform-origin: top center;
            translate: -50% var(--offset);
        }

        :host(.top-right) {
            top: calc(var(--vvd-offsetTop) * 1px);
            left: calc((var(--vvd-width) + var(--vvd-offsetLeft)) * 1px);
            transform-origin: top right;
            translate: calc(-100% - var(--offset)) var(--offset);
        }

        :host(.center-left) {
            top: calc(1px * ((var(--vvd-height) / 2) + var(--vvd-offsetTop)));
            left: calc(var(--vvd-offsetLeft) * 1px);
            transform-origin: center left;
            translate: var(--offset) -50%;
        }

        :host(.center-center){
            top: calc(1px * ((var(--vvd-height) / 2) + var(--vvd-offsetTop)));
            left: calc(1px * ((var(--vvd-width) / 2) + var(--vvd-offsetLeft)));
            translate: -50% -50%;
        }

        :host(.center-right) {
            top: calc(1px * ((var(--vvd-height) / 2) + var(--vvd-offsetTop)));
            left: calc((var(--vvd-width) + var(--vvd-offsetLeft)) * 1px);
            transform-origin: center right;
            translate: calc(-100% - var(--offset)) -50%;
        }

        :host(.bottom-left) {
            top: calc((var(--vvd-height) + var(--vvd-offsetTop)) * 1px);
            left: calc(var(--vvd-offsetLeft) * 1px);
            transform-origin: bottom left;
            translate: var(--offset) calc(-100% - var(--offset));
        }

        :host(.bottom-center) {
            top: calc((var(--vvd-height) + var(--vvd-offsetTop)) * 1px);
            left: calc(1px * ((var(--vvd-width) / 2) + var(--vvd-offsetLeft)));
            transform-origin: bottom center;
            translate: -50% calc(-100% - var(--offset));
        }

        :host(.bottom-right) {
            top: calc((var(--vvd-height) + var(--vvd-offsetTop)) * 1px);
            left: calc((var(--vvd-width) + var(--vvd-offsetLeft)) * 1px);
            transform-origin: bottom right;
            translate: calc(-100% - var(--offset)) calc(-100% - var(--offset));
        }

        header {
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--color-foreground);

            div {
                margin: -0.5px;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
            }
        }

        h2 {
            font-size: 1rem;
            margin:0;
            padding: 0.5rem 1rem;
        }

        button {
            all: unset;
            cursor: pointer;
            aspect-ratio: 1/1;
            margin: -0.5px;
            border: 1px solid var(--color-foreground);
            line-height: 1;
            overflow: hidden;
            background-color: gainsboro;

            &:hover {
                background-color: whitesmoke;
            }

            &:nth-of-type(2) {
                border-radius: 0 var(--border-radius) 0 0;
            }

            span {
                position: relative;
                top: -0.15em;
            }
        }

        section {
            padding: 0.5rem;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            color: inherit;
        }

        td {
            padding: 0.3em;

            thead & {
                padding-block-end: 0.5rem;
            }

            &:first-child {
                text-align: left;
            }

            &:last-child {
                text-align: right;
            }
        }

        td:first-child {
            color: teal;
        }

        td:last-child {
            color: navy;
        }
    `;

    constructor() {
        super();
        this.properties = Object.keys(Object.getPrototypeOf(visualViewport)).filter(property => typeof visualViewport[property] === 'number');
    }

    render() {
        this.properties.forEach(property => {
            document.documentElement.style.setProperty(`--vvd-${property}`, visualViewport[property]);
        });

        this.shadowRoot.setHTMLUnsafe(`
                <header>
                    <h2>Visual Viewport</h2>
                    <div>
                        <button data-position="top-left"><span>↖</span></button>
                        <button data-position="top-center"><span>↑</span></button>
                        <button data-position="top-right"><span>↗</span></button>
                        <button data-position="center-left"><span>←</span></button>
                        <button data-position="center-center"><span>・</span></button>
                        <button data-position="center-right"><span>→</span></button>
                        <button data-position="bottom-left"><span>↙</span></button>
                        <button data-position="bottom-center"><span>↓</span></button>
                        <button data-position="bottom-right"><span>↘</span></button>
                    </div>
                </header>
                <section>
                    <table>
                        <tbody>
                            ${this.properties.map(property => {
                                return `
                                    <tr>
                                        <td>${property}</td>
                                        <td>${visualViewport[property].toFixed(2)}</td>
                                    </tr>
                                `
                            }).join('\n')}
                        </tbody>
                    </table>
                </section>
            </template>
        `);

    }

    connectedCallback() {
        this.classList.add('bottom-right');
        this.attachShadow({ mode: "open" });

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.css);
        this.shadowRoot.adoptedStyleSheets = [sheet];

        this.render();

        visualViewport.addEventListener('resize', this.render.bind(this));
        visualViewport.addEventListener('scroll', this.render.bind(this));

        this.shadowRoot.addEventListener('click', event => {
            if(event.target.dataset.position || event.target.closest('[data-position]')) {
                this.className = event.target.dataset.position || event.target.closest('[data-position]').dataset.position;
            }
        })
    }
}