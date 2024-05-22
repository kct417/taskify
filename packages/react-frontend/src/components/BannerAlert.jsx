import React from 'react';
import { useState } from 'react';

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
			className={`alert position-absolute width-full alert-${type} alert-dismissible fade show`}
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

export default BannerAlert;
