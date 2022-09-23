import { Form } from "react-bootstrap";

const Forms = ({ label, type, placeholder, name, onChange, min }) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type={type}
				placeholder={placeholder}
				name={name}
				required
				onChange={onChange}
				minLength={min}
			/>
		</Form.Group>
	);
};

export default Forms; //
