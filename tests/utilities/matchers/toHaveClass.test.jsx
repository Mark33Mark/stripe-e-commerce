import { toHaveClass } from "./toHaveClass";

describe("toHaveClass matcher", () => {
	// remove any ASCII escape codes that add colour, we don't want to test the colours Jest
	// applies, just the text output as if it was plain text:
	const stripTerminalColor = (text) => text.replace(/\x1B\[\d+m/g, "");

	it("returns pass is true when class name is found in the given DOM element", () => {
		const domElement = { className: "class1" };
		const result = toHaveClass(domElement, "class1");
		expect(result.pass).toBe(true);
	});

	it("returns pass is false when the class name is not found in the given DOM element", () => {
		const domElement = { className: "" };
		const result = toHaveClass(domElement, "class1");
		expect(result.pass).toBe(false);
	});

	it("returns a message that contains the source line if no match", () => {
		const domElement = { className: "" };
		const result = toHaveClass(domElement, "class1");
		expect(stripTerminalColor(result.message())).toContain(
			`expect(element).toHaveClass("class1")`
		);
	});

	it("returns a message that contains the source line for a negated match", () => {
		const domElement = {
			className: "class1",
		};
		const result = toHaveClass(domElement, "class1");
		expect(stripTerminalColor(result.message())).toContain(
			`expect(element).not.toHaveClass("class1")`
		);
	});

	it("returns a message that contains the actual text", () => {
		const domElement = { className: "class1" };
		const result = toHaveClass(domElement, "class1");
		expect(stripTerminalColor(result.message())).toContain(
			`Actual classes: ["class1"]`
		);
	});

	it("returns a message with empty array if there are no classes", () => {
		const domElement = { className: "" };
		const result = toHaveClass(domElement, "class1");
		expect(stripTerminalColor(result.message())).toContain(
			`Actual classes: []`
		);
	});
});
