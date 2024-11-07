import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (received, expectedText) => {
	// remembering this matcher is testing for 'contains', so the includes() method means 'Ash' will be true for 'Ashley'.
	const pass = received.textContent.includes(expectedText);

	const sourceHint = () =>
		matcherHint("toContainText", "element", printExpected(expectedText), {
			isNot: pass,
		});

	const actualTextHint = () =>
		"Actual text: " + printReceived(received.textContent);

	const message = () => [sourceHint(), actualTextHint()].join("\n\n");

	return { pass, message };
};
