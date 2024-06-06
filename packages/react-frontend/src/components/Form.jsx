import PropTypes from 'prop-types';
import { useState } from 'react';
import { TASKIFY_THEME_COLOR } from '../constants';

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
				style={{
					color: '#FFFFFF',
					backgroundColor: TASKIFY_THEME_COLOR,
					borderColor: TASKIFY_THEME_COLOR,
				}}
				className="btn btn-block"
				onClick={() => {
					submitFunc(formFields);
				}}>
				{buttonText}
			</button>
		</form>
	);
};

Form.propTypes = {
	fields: PropTypes.arrayOf(PropTypes.object).isRequired,
	submitFunc: PropTypes.func.isRequired,
	buttonText: PropTypes.string.isRequired,
};

export default Form;
