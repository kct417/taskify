const Form = ({ fields }) => {
	console.log(fields);
	return (
		<form className="vstack text-center">
			{fields.map(([fieldname, placeholder]) => {
				return (
					<div className="form-group text-left">
						<label>{fieldname}</label>
						<input
							type="text"
							className="form-control"
							placeholder={placeholder}
						/>
					</div>
				);
			})}
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Form;
