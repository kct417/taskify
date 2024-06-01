import { useState } from 'react';

function useBanner() {
	const [isShowing, setShowing] = useState(false);
	const [content, setContent] = useState({});

	function showBanner(boldMessage, message, type) {
		setContent({
			boldMessage,
			message,
			type,
		});
		setShowing(true);
	}

	return { showBanner, bannerState: { ...content, isShowing, setShowing } };
}

export default useBanner;
