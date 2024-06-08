import PropTypes from 'prop-types';
import HomeList from '../components/HomeList';
import FolderList from '../components/FolderList';
import useBanner from '../hooks/UseBanner';
import BannerPageWrapper from '../components/BannerPageWrapper';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home = ({ user, updateUser }) => {
	Home.propTypes = {
		user: PropTypes.object.isRequired,
		updateUser: PropTypes.func.isRequired,
	};

	const { showBanner, bannerState } = useBanner();
	const { dividerName, folderName } = useParams();

	const showHomeList = !dividerName || !folderName;
	const homeList = (
		<HomeList user={user} updateUser={updateUser} showBanner={showBanner} />
	);
	const folderList = (
		<FolderList
			user={user}
			updateUser={updateUser}
			showBanner={showBanner}
			dividerName={dividerName}
			folderName={folderName}
		/>
	);
	return (
		<BannerPageWrapper bannerState={bannerState}>
			<div
				className="d-flex"
				style={{ height: '100vh', overflowY: 'hidden' }}>
				<Sidebar
					user={user}
					updateUser={updateUser}
					showBanner={showBanner}
				/>
				<div
					className="container-fluid p-0 d-flex"
					style={{ overflowY: 'auto' }}>
					{showHomeList ? homeList : folderList}
				</div>
			</div>
		</BannerPageWrapper>
	);
};

export default Home;
