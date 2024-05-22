import Default from '../components/Default';
import Sidebar from '../components/Sidebar';

const Home = () => {
	return (
		<div className="d-flex">
			<Sidebar />
			<div
				className="flex-grow-1"
				style={{ overflowY: 'auto', maxHeight: '100vh' }}>
				<Default />
			</div>
		</div>
	);
};

export default Home;
