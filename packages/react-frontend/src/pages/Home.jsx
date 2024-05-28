import DefHome from '../components/Default';
import Sidebar from '../components/Sidebar';

const Home = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	return (
		<div className="d-flex" style={{ height: '100vh', overflowY: 'hidden' }}>
			<Sidebar />
			<div
				className="container-fluid p-0 d-flex"style={{ overflowY: 'auto' }}>
				<DefHome
					API_PREFIX={API_PREFIX}
					token={token}
					INVALID_TOKEN={INVALID_TOKEN}
				/>
			</div>
		</div>
	);
};

export default Home;
