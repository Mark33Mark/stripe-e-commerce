import { useState } from "react";
import "./slider-styles.scss";

const MIN = 5;
const MAX = 5000;

export const SliderValueSelector = (props) => {
	const { sliderValue, setSliderValue } = props;
	// const [sliderValue, setSliderValue] = useState(1);

	const getBackgroundSize = () => {
		return { backgroundSize: `${(sliderValue * 100) / MAX}% 100%` };
	};

	const selectorChanged = (event) =>
		setSliderValue(parseInt(event.target.value));

	const handleSliderValueChange = (event) => {
		// stop button state change over riding the slider MIN and MAX settings
		if (sliderValue <= MIN || sliderValue >= MAX) return;

		// check if increase or decrease button pressed and adjust state value accordingly
		event.target.className.indexOf("increase") === 31
			? setSliderValue((prev) => prev + 1)
			: setSliderValue((prev) => prev - 1);
	};

	return (
		<div className="slider-value-selector">
			<button
				className="slider-value-selector__button--decrease"
				onClick={handleSliderValueChange}
			>
				➖
			</button>
			<input
				type="range"
				min={MIN}
				max={MAX}
				onChange={selectorChanged}
				style={getBackgroundSize()}
				value={sliderValue}
			/>
			<button
				className="slider-value-selector__button--increase"
				onClick={handleSliderValueChange}
			>
				➕
			</button>
			{/* {sliderValue.toLocaleString()} */}
		</div>
	);
};
