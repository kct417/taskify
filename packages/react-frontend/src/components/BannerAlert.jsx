import PropTypes from 'prop-types';
import { useEffect } from 'react';

const BannerAlert = ({ boldMessage, message, type, isShowing, setShowing }) => {
	BannerAlert.propTypes = {
		boldMessage: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		isShowing: PropTypes.bool.isRequired,
		setShowing: PropTypes.func.isRequired,
	};

	const showDurationSecs = 5; // how long to show the banner
	const hide = () => setShowing(false);

	// hide the banner alert after showDurationSecs seconds
	useEffect(() => {
		const hide = () => setShowing(false);
		if (isShowing) {
			setTimeout(hide, showDurationSecs * 1000);
		}
	}, [isShowing, setShowing]);

	// render nothing when not showing
	if (!isShowing) return <></>;
	return (
		<div
			className={`alert position-absolute fixed-top alert-${type} alert-dismissible fade show`}
			style={{ zIndex: 3 }}
			role="alert">
			<strong>{boldMessage}</strong>
			{/* adds space after bold message if a bold message is given */}
			{(boldMessage && ' ') + message}
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				onClick={hide}
				aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
};

export default BannerAlert;
