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
            --color-foreground: black;
            --color-background: white;
            --border-radius: 0;
            --offset: calc(1rem / var(--vv-scale));

            box-sizing: border-box;
            position: fixed;
            margin: auto;
            width: max-content;
            align-content: center;
            text-align: center;
            scale: calc(1 / var(--vv-scale));

            font-family: monospace;
            color: black;
            display: grid;
            background: var(--color-background);
            border-radius: var(--border-radius);
            border: 1px solid var(--color-foreground);
            box-shadow: 3px 3px 0 0 var(--color-foreground);
            transform-origin: var(--transform-origin-y) var(--transform-origin-x);
            translate: var(--translate-x) var(--translate-y);

            *, *::before, *::after {
                box-sizing: border-box;
            }
        }

        /* Vertical Positions */
        :host([data-position*="top-"]) {
            --transform-origin-y: top;
            --translate-y: var(--offset);
            top: calc(var(--vv-offsetTop) * 1px);
        }

        :host([data-position*="center-"]) {
            --transform-origin-y: center;
            --translate-y: -50%;
            top: calc(1px * ((var(--vv-height) / 2) + var(--vv-offsetTop)));
        }

        :host([data-position*="bottom-"]) {
            --transform-origin-y: bottom;
            --translate-y: calc(-100% - var(--offset));
            top: calc((var(--vv-height) + var(--vv-offsetTop)) * 1px);
        }

        /* Horizontal Positions */
        :host([data-position*="-left"]) {
            --transform-origin-x: left;
            --translate-x: var(--offset);
            left: calc(var(--vv-offsetLeft) * 1px);
        }

        :host([data-position*="-center"]) {
            --transform-origin-x: center;
            --translate-x: -50%;
            left: calc(1px * ((var(--vv-width) / 2) + var(--vv-offsetLeft)));
        }

        :host([data-position*="-right"]) {
            --transform-origin-x: right;
            --translate-x: calc(-100% - var(--offset));
            left: calc((var(--vv-width) + var(--vv-offsetLeft)) * 1px);
        }

        header {
            --gap: 0.125rem;
            --button-size: 0.5rem;

            border-bottom: 1px solid var(--color-foreground);
            padding-inline: 0.5rem 0.1rem;
            display: grid;
            grid-template-columns: 1fr min-content;
            gap: 0.3rem;
            align-items: center;
            background-color: gainsboro;

            div {
                margin: var(--gap);
                display: grid;
                grid-template-columns: repeat(3, minmax(max-content, 1fr));
                grid-template-rows: repeat(3, minmax(max-content, 1fr));
                gap: var(--gap);
                background:
                    /* vertical lines */
                    linear-gradient(
                        to right,
                        transparent,

                        transparent calc((var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc((var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc((var(--button-size) / 2) + 0.5px),
                        transparent calc((var(--button-size) / 2) + 0.5px),

                        transparent calc(50% - 0.5px),
                        var(--color-foreground) calc(50% - 0.5px),
                        var(--color-foreground) calc(50% + 0.5px),
                        transparent calc(50% + 0.5px),

                        transparent calc(100% - (var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc(100% - (var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc(100% - (var(--button-size) / 2) + 0.5px),
                        transparent calc(100% - (var(--button-size) / 2) + 0.5px)
                    ),

                    /* horizontal lines */
                    linear-gradient(
                        to bottom,
                        transparent,

                        transparent calc((var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc((var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc((var(--button-size) / 2) + 0.5px),
                        transparent calc((var(--button-size) / 2) + 0.5px),

                        transparent calc(50% - 0.5px),
                        var(--color-foreground) calc(50% - 0.5px),
                        var(--color-foreground) calc(50% + 0.5px),
                        transparent calc(50% + 0.5px),

                        transparent calc(100% - (var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc(100% - (var(--button-size) / 2) - 0.5px),
                        var(--color-foreground) calc(100% - (var(--button-size) / 2) + 0.5px),
                        transparent calc(100% - (var(--button-size) / 2) + 0.5px)
                    )
                ;

            }

            @media (pointer: coarse) {
                --gap: 0.5rem;
                --button-size: 1rem;
                padding-inline-start: 1rem;
            }
        }

        h2 {
            font-size: 1rem;
            margin:0;
            padding-block: 0.5rem;
        }

        button {
            all: unset;
            inline-size: var(--button-size);
            block-size: var(--button-size);
            display: grid;
            place-items: center;
            cursor: pointer;
            aspect-ratio: 1/1;
            line-height: 0;
            overflow: hidden;
            background-color: gainsboro;
            border: 1px solid var(--color-foreground);

            &:hover {
                background-color: whitesmoke;
            }

            &.active {
                background-color: var(--color-foreground);
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

    pendingUpdate = false;

    render() {
        if (this.pendingUpdate) return;
        this.pendingUpdate = true;

        requestAnimationFrame(() => {
            this.pendingUpdate = false;

            this.properties.forEach(property => {
                document.documentElement.style.setProperty(`--vv-${property}`, visualViewport[property]);
            });

            this.shadowRoot.setHTMLUnsafe(`
                    <header>
                        <h2>Visual Viewport</h2>
                        <div>
                            <button data-position="top-left"><!--<span>↖</span>--></button>
                            <button data-position="top-center"><!--<span>↑</span>--></button>
                            <button data-position="top-right"><!--<span>↗</span>--></button>
                            <button data-position="center-left"><!--<span>←</span>--></button>
                            <button data-position="center-center"><!--<span>⊙</span>--></button>
                            <button data-position="center-right"><!--<span>→</span>--></button>
                            <button data-position="bottom-left"><!--<span>↙</span>--></button>
                            <button data-position="bottom-center"><!--<span>↓</span>--></button>
                            <button data-position="bottom-right"><!--<span>↘</span>--></button>
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

            this.shadowRoot.querySelector(
                `button[data-position="${this.dataset.position}"]`
            ).classList.add('active');
        });
    }

    connectedCallback() {
        if(!this.dataset.position) {
            this.dataset.position = 'bottom-right';
        }

        this.attachShadow({ mode: "open" });

        const sheet = new CSSStyleSheet();
        sheet.replaceSync(this.css);
        this.shadowRoot.adoptedStyleSheets = [sheet];

        this.render();

        visualViewport.addEventListener('resize', this.render.bind(this));
        visualViewport.addEventListener('scroll', this.render.bind(this));

        this.shadowRoot.addEventListener('click', event => {
            if(event.target.dataset.position || event.target.closest('[data-position]')) {
                const buttons = this.shadowRoot.querySelectorAll('header button');
                const activeButton = (event.target.dataset.position ? event.target : event.target.closest('button[data-position]'));

                this.dataset.position = activeButton.dataset.position;

                buttons.forEach(button => {
                    if(button === activeButton) {
                        button.classList.add('active');
                    }
                    else {
                        button.classList.remove('active');
                    }
                });
            }
        })
    }
}