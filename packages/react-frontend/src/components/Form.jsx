import { useState } from 'react';
const Form = ({ fields, submitFunc }) => {
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
							onChange={(value) => {
								const newFields = formFields;
								newFields[fieldname] = value;
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
				Submit
			</button>
		</form>
	);
};

export default Form;
