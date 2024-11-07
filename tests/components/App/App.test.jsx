import { App } from "../../../src/components";
import { fireEvent, render, screen } from "@testing-library/react";
import { element } from "../../utilities";

describe("<App /> ", () => {
	beforeEach(() => {
		render(<App />);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("renders without crashing", () => {
		const headingElement = screen.getByRole("heading", {
			name: /I'm working 🎉/i,
		});

		const buttonElementIncrement = screen.getByRole("button", {
			name: /increase/i,
		});

		const buttonElementDecrease = screen.getByRole("button", {
			name: /decrease/i,
		});

		const buttonElementReset = screen.getByRole("button", {
			name: /reset/i,
		});

		expect(
			headingElement,
			buttonElementIncrement,
			buttonElementDecrease,
			buttonElementReset
		).toBeInTheDocument();
	});

	it("renders increased value after increase button selected", () => {
		const result = element(".fade-in");

		// renders initially with value = 0
		expect(result.textContent).toEqual("0");

		const buttonElementIncrement = screen.getByRole("button", {
			name: /increase/i,
		});

		fireEvent.click(buttonElementIncrement);

		// after 1 increase button click, the value should increase to "1"
		expect(result.textContent).toEqual("1");
	});

	it("renders decreased value after decrease button selected", () => {
		const result = element(".fade-in");

		// renders initially with value = 0
		expect(result.textContent).toEqual("0");

		const buttonElementDecrease = screen.getByRole("button", {
			name: /decrease/i,
		});

		fireEvent.click(buttonElementDecrease);

		// after 1 decrease button click, the value should decrease to "-1"
		expect(result.textContent).toEqual("-1");
	});

	it("value resets to 0 after reset button clicked", () => {
		const result = element(".fade-in");

		const buttonElementIncrement = screen.getByRole("button", {
			name: /increase/i,
		});
		const buttonElementReset = screen.getByRole("button", {
			name: /reset/i,
		});

		fireEvent.click(buttonElementIncrement);
		expect(result.textContent).toEqual("1");

		fireEvent.click(buttonElementReset);

		// after reset button click, the value should reset to "0"
		expect(result.textContent).toEqual("0");
	});
});
