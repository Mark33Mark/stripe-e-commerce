/**
 * What we are looking for:
 * - Shadow DOM, mode open/closed
 * - Get shadow root
 * - State change in the custom element?
 * - The style isolation
 
export class Counter extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = `
        <div>
            <div>Current count: <span class="counter-number">0</span></div>
            <button class="counter-increase">increase</button>
			<button class="counter-decrease">decrease</button>
			<button class="counter-reset">reset</button>
            </div>
        `;

		const root = this.shadowRoot;

		let count = 0;
		const countNode = root.querySelector(".counter-number");

		const btnIncrease = root.querySelector(".counter-increase");
		btnIncrease.addEventListener("click", () => {
			countNode.innerText = ++count;
		});

		const btnDecrease = root.querySelector(".counter-decrease");
		btnDecrease.addEventListener("click", () => {
			countNode.innerText = --count;
		});

		const btnReset = root.querySelector(".counter-reset");
		btnReset.addEventListener("click", () => {
			countNode.innerText = 0;
			count=0
		});
	}
}

customElements.define("my-counter", Counter);

*/

/*
	super() sets and returns the 'this' scope
	attachShadow sets and returns this.shadowRoot
	append() takes multiple arguments/elements
*/

customElements.define(
	"my-counter",
	class extends HTMLElement {
		static get observedAttributes() {
			return ["count"];
		}

		constructor() {
			const createElement = (tag, props = {}) =>
				Object.assign(document.createElement(tag), props);
			super()
				.attachShadow({ mode: "open" })
				.append(
					createElement("style", {
						innerHTML: `strong {padding: 1em;}`,
					}),
					createElement("BUTTON", {
						innerHTML: "dec",
						onclick: (e) => this.count--,
					}),
					createElement("BUTTON", {
						innerHTML: "inc",
						onclick: (e) => this.count++,
					}),
					createElement("BUTTON", {
						innerHTML: "reset",
						onclick: (e) => this.count = 0,
					}),
					(this.counter = createElement("STRONG", {
						innerHTML: "0",
					})),
				);
		}

		get count() {
			return Number(this.counter.textContent);
		}

		set count(newValue) {
			this.setAttribute("count", (this.counter.textContent = newValue));
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (oldValue !== newValue) this.count = newValue;
		}
	}
);
