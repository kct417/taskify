import { useState } from 'react';
import BannerPageWrapper from './BannerPageWrapper';
import PropTypes from 'prop-types';
import { TASKIFY_THEME_COLOR } from '../constants';

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
		borderColor: TASKIFY_THEME_COLOR,
		color: TASKIFY_THEME_COLOR,
	};
	const hoverStyle = {
		borderColor: TASKIFY_THEME_COLOR,
		background: TASKIFY_THEME_COLOR,
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

AuthPageWrapper.propTypes = {
	children: PropTypes.object,
	header: PropTypes.object.isRequired,
	alternateText: PropTypes.string.isRequired,
	alternateButtonText: PropTypes.string.isRequired,
	alternateButtonOnClick: PropTypes.func.isRequired,
	bannerState: PropTypes.object.isRequired,
};

export default AuthPageWrapper;
