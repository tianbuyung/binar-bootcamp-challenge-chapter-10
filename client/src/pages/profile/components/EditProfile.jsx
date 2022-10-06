import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormEdit from "./FormEdit";

const EditProfile = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="me-2" onClick={handleShow}>
        Edit Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header>Edit Profile</Modal.Header>
          <Modal.Body>
            <FormEdit label="Full Name" type="text" value={props.name} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditProfile;
