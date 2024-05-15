import PropTypes from 'prop-types';
import { useState } from 'react';

const Form = ({ fields, submitFunc, buttonText }) => {
	const [formFields, updateFields] = useState({});

	return (
		<form className="vstack text-center">
			{fields.map(([fieldname, placeholder], idx) => {
				return (
					<div key={idx} className="form-group text-left">
						<label>{fieldname}</label>
						<input
							type="text"
							className="form-control"
							placeholder={placeholder}
							onChange={(event) => {
								const newFields = formFields;
								newFields[fieldname] = event.target.value;
								updateFields(newFields);
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
	fields: PropTypes.arrayOf(PropTypes.array),
	submitFunc: PropTypes.func.isRequired,
};

export default Form;
