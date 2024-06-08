import BannerAlert from './BannerAlert';
import PropTypes from 'prop-types';

const BannerPageWrapper = ({ children, bannerState }) => {
	BannerPageWrapper.propTypes = {
		children: PropTypes.object.isRequired,
		bannerState: PropTypes.object.isRequired,
	};

	// puts banner alert component at top of document in html with all the correct state
	return (
		<>
			<BannerAlert
				boldMessage={bannerState.boldMessage}
				message={bannerState.message}
				type={bannerState.type}
				isShowing={bannerState.isShowing}
				setShowing={bannerState.setShowing}
			/>
			{children}
		</>
	);
};

export default BannerPageWrapper;
