import { Form } from "react-bootstrap";

const FormEdit = (props) => {
  return (
    <Form.Group md="4" controlId="validationCustom01">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.label}
        defaultValue={props.value}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid name.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormEdit;
