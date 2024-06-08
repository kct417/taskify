import { TASKIFY_THEME_COLOR } from '../constants';
import fire_asset from '../assets/fire_asset.png';

const ListHeader = ({ title, streak }) => {
	return (
		<header
			className="sticky-top bg-white mb-4 p-3 rounded"
			style={{
				borderBottom: `4px solid ${TASKIFY_THEME_COLOR}`,
				zIndex: 1,
			}}>
			<div className="d-flex justify-content-between align-items-center">
				{title}
				<div className="d-flex align-items-center">
					<div className="position-relative">
						<img
							src={fire_asset}
							className="img-fluid"
							style={{ width: '50px', height: '50px' }}
							alt="Fire"
						/>
						<figcaption
							className="position-absolute"
							style={{
								top: '35%',
								left: '30%',
								color: 'black',
								fontSize: '1.25em',
							}}>
							{streak}
						</figcaption>
					</div>
				</div>
			</div>
			<hr />
		</header>
	);
};

export default ListHeader;
