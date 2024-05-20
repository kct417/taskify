import PropTypes from 'prop-types';
import { useState } from 'react';

function Overlay({ show, context, fields, buttons, handleClose }) {
	const [formFields] = useState({});

	if (!show) {
		return null;
	}

	return (
		<div
			className="modal fade show d-block"
			tabIndex="-1"
			role="dialog"
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{context.title}</h5>
						<button
							type="button"
							className="close"
							aria-label="Close"
							onClick={handleClose}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p>{context.text}</p>
					</div>
					{fields.map((field, idx) => {
						const { label, placeholder, type, key } = field;
						return (
							<div key={idx} className="form-group text-left">
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
					{buttons.map((button, idx) => {
						const { label, type } = button;
						return (
							<div
								key={idx}
								className="form-group text-center"
								style={{ padding: '0 10px' }}>
								<button
									type={type}
									className="btn btn-primary btn-block"
									onClick={button.onClick || handleClose}
									style={{
										backgroundColor: '#F38D8D',
										borderColor: '#F38D8D',
										fontSize: '18px',
									}}>
									{label}
								</button>{' '}
							</div>
						);
					})}
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={handleClose}
							style={{
								backgroundColor: '#F38D8D',
								borderColor: '#F38D8D',
								fontSize: '18px',
							}}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

Overlay.propTypes = {
	show: PropTypes.bool,
	context: PropTypes.object,
	fields: PropTypes.arrayOf(PropTypes.object),
	buttons: PropTypes.arrayOf(PropTypes.object),
	handleClose: PropTypes.func.isRequired,
};

export default Overlay;
