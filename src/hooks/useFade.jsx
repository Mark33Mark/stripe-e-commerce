import { useState, useEffect } from "react";

export const useFade = (initial) => {
	// show is controlling the CSS animation
	const [show, setShow] = useState(initial);

	// isVisible is exposed to the component (toggled after animation)
	const [visible, setVisible] = useState(null);

	// Update visibility when show changes
	useEffect(() => {
		if (show) setVisible(true);
	}, [show]);

	// These props go on the fading DOM element
	const fromProps = {
		style: { animation: `${show ? "fadeIn" : "fadeOut"} 2s` },
		onAnimationEnd: (event) => {
			console.log('onAnimatedEnd Event "fadeIn" = ', event.target);
			!show && setVisible(false);
		},
	};

	const toProps = {
		style: { animation: `${show ? "fadeOut" : "fadeIn"} 2s` },
		onAnimationEnd: (event) => {
			console.log('onAnimatedEnd Event "fadeOut" = ', event.target);
			show && setVisible(true);
		},
	};

	return { visible, setShow, fromProps, toProps };
};

/*
EXAMPLE APPLICATION

import { useFade } from "./useFade";

export const App = () => {
	const { visible, setShow, fromProps, toProps } = useFade();

	return (
		<div className="app">
			<p>
				Fades in the component when mounted and fades out
				animation to finish before unmounting.
			</p>

			<button onClick={() => setShow(!visible)}>
				{ visible ? "fade out" : "fade in"} message
			</button>

			{visible && <h3 {...fromProps}{...toProps}>Now you see me...</h3>}
		</div>
	);
}

*/
