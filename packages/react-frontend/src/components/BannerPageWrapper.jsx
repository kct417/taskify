import BannerAlert from './BannerAlert';
import PropTypes from 'prop-types';

const BannerPageWrapper = ({ children, bannerState }) => {
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
