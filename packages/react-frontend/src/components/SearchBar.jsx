import PropTypes from 'prop-types';
import { useState, useRef } from 'react';

const SearchBar = ({ suggestions }) => {
	const [inputValue, setInputValue] = useState('');
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [activeSuggestion, setActiveSuggestion] = useState(-1);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const autocompleteRef = useRef(null);

	const handleChange = (event) => {
		const value = event.target.value;
		setInputValue(value);

		if (value) {
			const filtered = suggestions.filter((suggestion) =>
				suggestion.toLowerCase().includes(value.toLowerCase()),
			);

			const previousSuggestion = filteredSuggestions[activeSuggestion];
			const newIndex = filtered.indexOf(previousSuggestion);

			setFilteredSuggestions(filtered);

			if (newIndex !== -1) {
				setActiveSuggestion(newIndex);
			} else {
				setActiveSuggestion(-1);
			}

			setShowSuggestions(true);
		} else {
			setFilteredSuggestions([]);
			setActiveSuggestion(-1);
			setShowSuggestions(false);
		}
	};

	const handleKeyDown = (event) => {
		switch (event.keyCode) {
			case 40: // Arrow down
				event.preventDefault();
				if (activeSuggestion < filteredSuggestions.length - 1) {
					setActiveSuggestion(activeSuggestion + 1);
				}
				break;
			case 38: // Arrow up
				event.preventDefault();
				if (activeSuggestion >= 0) {
					setActiveSuggestion(activeSuggestion - 1);
				}
				break;
			case 13: // Enter
				if (activeSuggestion >= 0) {
					event.preventDefault();
					setInputValue(filteredSuggestions[activeSuggestion]);
					setFilteredSuggestions([]);
					setShowSuggestions(false);
				}
				break;
			case 9: // Tab
				if (!event.shiftKey) {
					// Move to the next suggestion when Tab is pressed
					event.preventDefault();
					if (activeSuggestion < filteredSuggestions.length - 1) {
						setActiveSuggestion(activeSuggestion + 1);
					}
				} else {
					// Move to the previous suggestion when Shift+Tab is pressed
					event.preventDefault();
					if (activeSuggestion >= 0) {
						setActiveSuggestion(activeSuggestion - 1);
					}
				}
				break;
			default:
				break;
		}
	};

	const handleClick = (suggestion) => {
		setInputValue(suggestion);
		setFilteredSuggestions([]);
		setShowSuggestions(false);
	};

	const handleBlur = () => {
		setTimeout(() => setShowSuggestions(false), 100);
	};

	return (
		<div className="container">
			<form className="form-inline" autoComplete="off">
				<div
					className="autocomplete position-relative"
					style={{
						width: '300px',
					}}
					ref={autocompleteRef}>
					<input
						id="myInput"
						type="text"
						name="myCountry"
						className={`form-control ${activeSuggestion !== -1 ? 'bg-light' : ''}`}
						placeholder="Country"
						value={inputValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onBlur={handleBlur}
						onFocus={() => setShowSuggestions(true)}
					/>
					{showSuggestions && filteredSuggestions.length > 0 && (
						<div
							className="autocomplete-items list-group position-absolute w-100"
							style={{
								zIndex: 99,
								top: '100%',
								left: 0,
							}}>
							{filteredSuggestions.map((suggestion, index) => (
								<button
									key={suggestion}
									type="button"
									className={`list-group-item list-group-item-action ${index === activeSuggestion ? 'active' : ''}`}
									onClick={() => handleClick(suggestion)}>
									{suggestion}
								</button>
							))}
						</div>
					)}
				</div>
				<button type="submit" className="btn btn-primary ml-2">
					Submit
				</button>
			</form>
		</div>
	);
};

SearchBar.propTypes = {
	suggestions: PropTypes.array.isRequired,
};

export default SearchBar;
