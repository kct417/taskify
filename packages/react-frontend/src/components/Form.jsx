import PropTypes from 'prop-types';
import { useState } from 'react';

const Form = ({ fields, submitFunc, buttonText }) => {
	const [formFields] = useState({});

	return (
		<form className="vstack text-center">
			{fields.map((field, index) => {
				const { label, placeholder, type, key } = field;
				return (
					<div key={index} className="form-group text-left">
						<label>{label}</label>
						<input
							type={type}
							className="form-control"
							placeholder={placeholder}
							onChange={(event) => {
								formFields[key] = event.target.value;
							}}
						/>
					</div>
				);
			})}
			<button
				type="button"
				className="btn btn-primary"
				onClick={() => {
					submitFunc(formFields);
				}}>
				{buttonText}
			</button>
		</form>
	);
};

Form.propTypes = {
	buttonText: PropTypes.string,
	fields: PropTypes.arrayOf(PropTypes.object).isRequired,
	submitFunc: PropTypes.func.isRequired,
};

export default Form;
