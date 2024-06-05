import PropTypes from 'prop-types';
import useBanner from '../hooks/UseBanner';

import HomeList from '../components/HomeList';
import Sidebar from '../components/Sidebar';
import BannerPageWrapper from '../components/BannerPageWrapper';

const Home = ({ API_PREFIX, user, setUser }) => {
	const { showBanner, bannerState } = useBanner();
	return (
		<BannerPageWrapper bannerState={bannerState}>
			<div
				className="d-flex"
				style={{ height: '100vh', overflowY: 'hidden' }}>
				<Sidebar
					API_PREFIX={API_PREFIX}
					user={user}
					setUser={setUser}
					showBanner={showBanner}
				/>
				<div
					className="container-fluid p-0 d-flex"
					style={{ overflowY: 'auto' }}>
					<HomeList
						API_PREFIX={API_PREFIX}
						user={user}
						setUser={setUser}
						showBanner={showBanner}
					/>
				</div>
			</div>
		</BannerPageWrapper>
	);
};

Home.propTypes = {
	API_PREFIX: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};

export default Home;
