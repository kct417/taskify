import DefHome from '../components/Default';
import Sidebar from '../components/Sidebar';

const Home = ({ API_PREFIX, token, INVALID_TOKEN }) => {
	return (
		<div className="d-flex">
			<Sidebar />

			<div
				className="flex-grow-1"
				style={{ overflowY: 'auto', maxHeight: '100vh' }}>
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
