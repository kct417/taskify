import PropTypes from 'prop-types';

const BannerAlert = ({
	boldMessage,
	message,
	type,
	isShowing,
	setIsShowing,
}) => {
	if (!isShowing) return <></>;
	return (
		<div
			className={`alert position-absolute fixed-top alert-${type} alert-dismissible fade show`}
			role="alert">
			<strong>{boldMessage}</strong>
			{(boldMessage && ' ') + message}
			<button
				type="button"
				className="close"
				data-dismiss="alert"
				onClick={() => setIsShowing(false)}
				aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	);
};

BannerAlert.propTypes = {
	boldMessage: PropTypes.string,
	message: PropTypes.string,
	type: PropTypes.string,
	isShowing: PropTypes.bool.isRequired,
	setIsShowing: PropTypes.func.isRequired,
};

export default BannerAlert;
