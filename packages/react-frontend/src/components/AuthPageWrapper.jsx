import { useState } from 'react';

const AuthPageWrapper = ({
	children,
	header,
	optionText,
	optionButtonText,
	optionButtonOnClick,
}) => {
	const [isHovering, setHovering] = useState(false);
	const nonHoverStyle = {
		background: '#FFFFFF',
		borderColor: '#F38D8D',
		color: '#F38D8D',
	};
	const hoverStyle = {
		borderColor: '#F38D8D',
		background: '#F38D8D',
		color: '#FFFFFF',
	};
	return (
		<div className="d-flex justify-content-center align-items-center">
			<div className="w-50 mt-5">
				<h1 className="mb-5 text-center">{header}</h1>
				{children}
				<p className="mt-3 text-center">
					{optionText}
					<button
						type="button"
						style={isHovering ? hoverStyle : nonHoverStyle}
						onMouseEnter={() => setHovering(true)}
						onMouseLeave={() => setHovering(false)}
						className="ml-2 btn"
						onClick={optionButtonOnClick}>
						<strong>{optionButtonText}</strong>
					</button>
				</p>
			</div>
		</div>
	);
};

export default AuthPageWrapper;
