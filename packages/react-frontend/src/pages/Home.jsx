import Default from '../components/Default';
import Sidebar from '../components/Sidebar';

const Home = () => {
	return (
		<div className="d-flex">
			<Sidebar />
			<Default />
		</div>
	);
};

export default Home;
