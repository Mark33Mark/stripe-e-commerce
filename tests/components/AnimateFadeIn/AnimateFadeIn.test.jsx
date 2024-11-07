import { AnimateFadeIn } from "../../../src/components";
import {  render } from "@testing-library/react";
import { elements } from "../../utilities"

describe("<Products /> ", () => {

    const children = 1;

	it("renders without crashing", () => {
		render(<AnimateFadeIn children={children} on={children} />);

		const animationElement = elements(".fade-in")[0];		
		expect(animationElement).toHaveClass(/fade-in/i);

	});

    it("renders when the 'on' attribute is 'undefined'", () => {
		render(<AnimateFadeIn children={children} on={undefined} />);
		const animationElement = elements(".no-fade-in")[0];
		expect(animationElement).toHaveClass(/no-fade-in/i);
	});

});