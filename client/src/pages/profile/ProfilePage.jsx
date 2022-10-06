import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadcrumbComponent from "../../components/breadcrumbs/BreadCrumbs";
import Navbar from "../../components/navbar";
import UserService from "../../services/UserService";
import ProfileData from "./components/ProfileData";
import ProfilePicture from "./components/ProfilePicture";
import SocialMedia from "./components/SocialMedia";

import "./ProfilePage.css";

const userService = new UserService();

const ProfilePage = () => {
  const [profile, setProfile] = useState("");
  const [badge, setBadge] = useState("");

  useEffect(() => {
    const fetchGetUserHandler = async () => {
      try {
        const getUser = await userService.getUser();
        const getBadge = await userService.getBadge();
        setProfile(getUser);
        setBadge(getBadge);
      } catch (error) {
        // silent error
      }
    };
    fetchGetUserHandler();
  }, []);

  const socialMedias = [
    { name: "Website", icon: "bi bi-globe", data: "https://dummy.com" },
    { name: "Github", icon: "bi bi-github", data: "dummy" },
    { name: "Twitter", icon: "bi bi-twitter", data: "@dummy" },
    { name: "Instagram", icon: "bi bi-instagram", data: "dummy" },
    { name: "Facebook", icon: "bi bi-facebook", data: "dummy" },
  ];

  const breadcrumbs = [
    { title: "Home", isActive: false, href: "/" },
    { title: "Profile", isActive: true },
  ];

  return (
    <>
      <Navbar variant={"dark"} bg={"dark"} />
      <Container className="main-body">
        <BreadcrumbComponent data={breadcrumbs} />
        <Row className="gutters-sm">
          <Col md={4} className="mb-3">
            <ProfilePicture profile={profile} />
          </Col>
          <Col md={5}>
            <ProfileData profile={profile} badge={badge} />
          </Col>
          <Col md={3}>
            <SocialMedia socialMedias={socialMedias} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
