import { useState } from "react";

export const useCounter = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const increment = () => {
		setValue((prev) => prev + 1);
	};

	const decrement = () => {
		setValue((prev) => {
			// if (prev === 0) return prev;
			return prev - 1;
		});
	};

	const reset = () => {
		setValue(0);
	};

	return { value, reset, increment, decrement };
};
