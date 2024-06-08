import BannerAlert from './BannerAlert';
import PropTypes from 'prop-types';

const BannerPageWrapper = ({ children, bannerState }) => {
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

BannerPageWrapper.propTypes = {
	children: PropTypes.object,
	bannerState: PropTypes.object,
};

export default BannerPageWrapper;
