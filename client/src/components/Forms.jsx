import { Form } from "react-bootstrap";

const Forms = ({ label, type, placeholder, name }) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type={type}
				placeholder={placeholder}
				name={name}
				required
			/>
		</Form.Group>
	);
};

export default Forms; //
