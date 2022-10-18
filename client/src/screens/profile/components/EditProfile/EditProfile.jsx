import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UserService from "@services/UserService";
import FormEdit from "./FormEdit";

const userService = new UserService();

const EditProfile = (props) => {
  const [show, setShow] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredTwitter, setEnteredTwitter] = useState("");
  const [enteredInstagram, setEnteredInstagram] = useState("");
  const [enteredFacebook, setEnteredFacebook] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateUserChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const updateAddressChangeHandler = (event) => {
    setEnteredAddress(event.target.value);
  };

  const updatePhoneNumberChangeHandler = (event) => {
    setEnteredPhoneNumber(event.target.value);
  };

  const updateTwitterChangeHandler = (event) => {
    setEnteredTwitter(event.target.value);
  };

  const updateInstagramChangeHandler = (event) => {
    setEnteredInstagram(event.target.value);
  };

  const updateFacebookChangeHandler = (event) => {
    setEnteredFacebook(event.target.value);
  };

  const updateUserHandler = async (event) => {
    event.preventDefault();

    props.setIsFetching(false);

    const body = {
      name: enteredName === "" ? props.name : enteredName,
      address: enteredAddress === "" ? props.address : enteredAddress,
      phoneNumber:
        enteredPhoneNumber === "" ? props.phoneNumber : enteredPhoneNumber,
      twitter: enteredTwitter === "" ? props.twitter : enteredTwitter,
      instagram: enteredInstagram === "" ? props.instagram : enteredInstagram,
      facebook: enteredFacebook === "" ? props.facebook : enteredFacebook,
    };

    const data = await userService.editUser(body);
    alert(data.message);
    if (data.message !== "The user has been successfully updated") {
      setEnteredName(enteredName);
      setEnteredAddress(enteredAddress);
      setEnteredPhoneNumber(enteredPhoneNumber);
      setEnteredTwitter(enteredTwitter);
      setEnteredInstagram(enteredInstagram);
      setEnteredFacebook(enteredFacebook);
    } else {
      props.setIsFetching(true);
      setShow(false);
    }
  };

  return (
    <>
      <Button variant="primary" className="me-2" onClick={handleShow}>
        Edit Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={updateUserHandler}>
          <Modal.Header closeButton>Edit Profile</Modal.Header>
          <Modal.Body>
            <FormEdit
              label="Full Name"
              type="text"
              value={props.name}
              onChange={updateUserChangeHandler}
              name="fullName"
            />
            <FormEdit
              label="Address"
              type="text"
              value={props.address}
              onChange={updateAddressChangeHandler}
              name="address"
            />
            <FormEdit
              label="Phone Number"
              type="number"
              minLength={11}
              maxLength={13}
              value={props.phoneNumber}
              onChange={updatePhoneNumberChangeHandler}
              name="phoneNumber"
            />
            <FormEdit
              label="Twitter"
              type="text"
              value={props.twitter}
              onChange={updateTwitterChangeHandler}
              name="twitter"
            />
            <FormEdit
              label="Instagram"
              type="text"
              value={props.instagram}
              onChange={updateInstagramChangeHandler}
              name="instagram"
            />
            <FormEdit
              label="Facebook"
              type="text"
              value={props.facebook}
              onChange={updateFacebookChangeHandler}
              name="facebook"
            />
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
