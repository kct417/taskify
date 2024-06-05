import BannerAlert from './BannerAlert';

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

export default BannerPageWrapper;
