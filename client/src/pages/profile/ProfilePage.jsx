import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadcrumbComponent from "../../components/breadcrumbs/BreadCrumbs";
import Navbar from "../../components/navbar";
import UserService from "../../services/UserService";
import ProfileData from "./components/ProfileData/ProfileData";
import ProfilePicture from "./components/ProfilePicture";
import SocialMedia from "./components/SocialMedia";

import "./ProfilePage.css";

const userService = new UserService();

const ProfilePage = () => {
  const [profile, setProfile] = useState("");
  const [badge, setBadge] = useState("");
  const [isfetching, setIsFetching] = useState(false);

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
  }, [isfetching]);

  const socialMedias = [
    {
      name: "Twitter",
      icon: "bi bi-twitter",
      data: profile.user?.twitter,
      link: `https://twitter.com/${profile.user?.twitter}`,
    },
    {
      name: "Instagram",
      icon: "bi bi-instagram",
      data: profile.user?.instagram,
      link: `https://www.instagram.com/${profile.user?.instagram}`,
    },
    {
      name: "Facebook",
      icon: "bi bi-facebook",
      data: profile.user?.facebook,
      link: `https://www.facebook.com/${profile.user?.facebook}`,
    },
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
        <Row className="gutters-sm mb-3">
          <Col md={4}>
            <ProfilePicture profile={profile} setIsFetching={setIsFetching} />
          </Col>
          <Col md={8}>
            <ProfileData profile={profile} badge={badge} />
          </Col>
        </Row>
        <Row className="gutters-sm mb-3">
          <Col md={12}>Menu untuk History</Col>
        </Row>
        <Row className="gutters-sm">
          <Col md={12}>
            <SocialMedia socialMedias={socialMedias} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
