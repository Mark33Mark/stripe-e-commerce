import { act } from 'react';
import ReactDOM from 'react-dom/client';
//import { act } from 'react-dom/test-utils';

// let container;

export const initialiseReactContainer = () => {
	const container = document.createElement('div');
	document.body.replaceChildren(container);
};

export const render = (component) => {
	act(() => {
		const container = document.createElement('div');
		document.body.replaceChildren(container);

		const root = ReactDOM.createRoot(container);
		root.render(component);
	});
};

export const click = (element) => act(() => element.click());

export const clickAndWait = async (element) => act(async () => click(element));

export const submit = (formElement) => {
	const event = new Event('submit', { bubbles: true, cancelable: true });
	act(() => formElement.dispatchEvent(event));
	return event;
};

export const submitAndWait = async (formElement) =>
	act(async () => submit(formElement));

const originalValueProperty = (reactElement) => {
	const prototype = Object.getPrototypeOf(reactElement);
	return Object.getOwnPropertyDescriptor(prototype, 'value');
};

export const change = (target, value) => {
	originalValueProperty(target).set.call(target, value);
	const event = new Event('change', { target, bubbles: true });
	act(() => target.dispatchEvent(event));
};

// returns the 1st element that matches the specified CSS selector.
// null returned if no matches found.
// e.g. const el = element(".myclass");
export const element = (selector) => document.querySelector(selector);

// returns all elements that match the specified CSS selector as a NodeList, not an array but similar.
// empty NodeList is returned, [], if no matches found.
// e.g. for NodeList of all <p> elements: const el = elements("p");
export const elements = (selector) =>
	Array.from(document.querySelectorAll(selector));

export const typesOf = (elements) => elements.map((element) => element.type);

export const textOf = (elements) =>
	elements.map((element) => element.textContent);

export const form = (id) => element('form');

export const field = (fieldName) => form().elements[fieldName];

export const submitButton = () => element('input[type=submit]');

export const labelFor = (formElement) => element(`label[for=${formElement}]`);

//  == my own extensions =======================

/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}       Returns true if they're equal in value
 */
export const isEqual = (obj1, obj2) => {
	/**
	 * More accurately check the type of a JavaScript object
	 * @param  {Object} obj The object
	 * @return {String}     The object type
	 */
	const getType = (obj) => {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	};

	const areArraysEqual = () => {
		// Check length
		if (obj1.length !== obj2.length) return false;

		// Check each item in the array
		for (let i = 0; i < obj1.length; i++) {
			if (!isEqual(obj1[i], obj2[i])) return false;
		}

		// If no errors, return true
		return true;
	};

	const areObjectsEqual = () => {
		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

		// Check each item in the object
		for (let key in obj1) {
			if (Object.prototype.hasOwnProperty.call(obj1, key)) {
				if (!isEqual(obj1[key], obj2[key])) return false;
			}
		}

		// If no errors, return true
		return true;
	};

	const areFunctionsEqual = () => {
		return obj1.toString() === obj2.toString();
	};

	const arePrimativesEqual = () => {
		return obj1 === obj2;
	};

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	if (type === 'function') return areFunctionsEqual();
	return arePrimativesEqual();
};

export const propsOf = (mockComponent) => {
	const lastCall =
		mockComponent.mock.calls[mockComponent.mock.calls.length - 1];
	return lastCall[0];
};
