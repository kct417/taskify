import { useState } from 'react';
import BannerPageWrapper from './BannerPageWrapper';

const AuthPageWrapper = ({
	children,
	header,
	alternateText,
	alternateButtonText,
	alternateButtonOnClick,
	bannerState,
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
		<BannerPageWrapper bannerState={bannerState}>
			<div className="d-flex justify-content-center align-items-center">
				<div className="w-50 mt-5">
					<h1 className="mb-5 text-center">{header}</h1>
					{children}
					<p className="mt-3 text-center">
						{alternateText}
						<button
							type="button"
							style={isHovering ? hoverStyle : nonHoverStyle}
							onMouseEnter={() => setHovering(true)}
							onMouseLeave={() => setHovering(false)}
							className="ml-2 btn"
							onClick={alternateButtonOnClick}>
							<strong>{alternateButtonText}</strong>
						</button>
					</p>
				</div>
			</div>
		</BannerPageWrapper>
	);
};

export default AuthPageWrapper;
