import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Navbar from "../../components/navbar";
import UserService from "../../services/UserService";

import "./ProfilePage.css";

const userService = new UserService();

const ProfilePage = () => {
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchGetUserHandler = async () => {
      try {
        const getEmail = document.cookie || "Molly_Lebsack33@hotmail.com";
        setEmail(getEmail);
        const data = await userService.getUser(email);
        setProfile(data);
      } catch (error) {
        //
      }
    };
    fetchGetUserHandler(email);
  }, [email]);

  const socialMedias = [
    { name: "Website", icon: "bi bi-globe", data: "https://dummy.com" },
    { name: "Github", icon: "bi bi-github", data: "dummy" },
    { name: "Twitter", icon: "bi bi-twitter", data: "@dummy" },
    { name: "Instagram", icon: "bi bi-instagram", data: "dummy" },
    { name: "Facebook", icon: "bi bi-facebook", data: "dummy" },
  ];

  return (
    <>
      <Navbar />
      <Container className="main-body">
        <Row className="gutters-sm">
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{profile.user?.name}</h4>
                    <p className="text-secondary mb-1">{profile.user?.email}</p>
                    <p className="text-muted font-size-sm">
                      Bay Area, San Francisco, CA
                    </p>
                    <Button variant="primary" className="me-2">
                      Follow
                    </Button>
                    <Button variant="outline-primary">Message</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <ListGroup className="list-group-flush">
                {socialMedias.map((socialMedia, index) => {
                  return (
                    <ListGroupItem
                      className="d-flex justify-content-between align-items-center flex-wrap"
                      key={index}
                    >
                      <h6 className="mb-0">
                        <i className={socialMedia.icon}></i> {socialMedia.name}
                      </h6>
                      <span className="text-secondary">{socialMedia.data}</span>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Full Name</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {profile.user?.name}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm={3}>
                    <h6 className="mb-0">Email</h6>
                  </Col>
                  <Col sm={9} className="text-secondary">
                    {profile.user?.email}
                  </Col>
                </Row>
                <hr />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
