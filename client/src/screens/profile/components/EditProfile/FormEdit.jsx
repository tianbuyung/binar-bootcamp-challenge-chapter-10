import { Form } from "react-bootstrap";

const FormEdit = (props) => {
  return (
    <Form.Group md="4" controlId={props.name}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        name={props.name}
        type={props.type}
        placeholder={props.label}
        defaultValue={props.value}
        onChange={props.onChange}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid name.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormEdit;
