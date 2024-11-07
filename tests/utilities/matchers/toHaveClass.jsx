import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
import { isEqual } from "../reactTestExtensions";

export const toHaveClass = (received, expectedClass) => {
	const obj1 = received.className;

	const pass = isEqual(obj1, expectedClass);

	const sourceHint = () =>
		matcherHint("toHaveClass", "element", printExpected(expectedClass), {
			isNot: pass,
		});

	const actualTextHint = () =>
		received.className === ""
			? "Actual classes: " + printReceived([])
			: "Actual classes: " + printReceived(received.className.split(" "));

	const message = () => [sourceHint(), actualTextHint()].join("\n\n");

	return { pass, message };
};
