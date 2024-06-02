import PropTypes from 'prop-types';
import useBanner from '../hooks/UseBanner';

import HomeList from '../components/HomeList';
import Sidebar from '../components/Sidebar';
import BannerPageWrapper from '../components/BannerPageWrapper';

const Home = ({ API_PREFIX, token, INVALID_TOKEN, username }) => {
	const { showBanner, bannerState } = useBanner();
	return (
		<BannerPageWrapper bannerState={bannerState}>
			<div
				className="d-flex"
				style={{ height: '100vh', overflowY: 'hidden' }}>
				<Sidebar
					API_PREFIX={API_PREFIX}
					token={token}
					INVALID_TOKEN={INVALID_TOKEN}
					username={username}
					showBanner={showBanner}
				/>
				<div
					className="container-fluid p-0 d-flex"
					style={{ overflowY: 'auto' }}>
					<HomeList
						API_PREFIX={API_PREFIX}
						token={token}
						INVALID_TOKEN={INVALID_TOKEN}
						username={username}
					/>
				</div>
			</div>
		</BannerPageWrapper>
	);
};

Home.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	token: PropTypes.string.isRequired,
	INVALID_TOKEN: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};
export default Home;
