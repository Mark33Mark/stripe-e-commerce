
export const AnimateFadeIn = ({ children, on }) => {

	return on === undefined ? (
		<div className="no-fade-in">{children}</div>
	) : (
		<div className="fade-in" >{children}</div>
	);
};
