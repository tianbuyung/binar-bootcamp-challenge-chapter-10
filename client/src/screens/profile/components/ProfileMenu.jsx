import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import ProfileData from "./ProfileData/ProfileData";
import ProfileOrder from "./ProfileOrder/ProfileOrder";

const ProfileMenu = (props) => {
  return (
    <Card>
      <Card.Body>
        <Tab.Container id="profileMenu" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profil</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Daftar Pesanan</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Binarpay</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first" style={{ height: "400px" }}>
                  <ProfileData profile={props.profile} badge={props.badge} />
                </Tab.Pane>
                <Tab.Pane eventKey="second" style={{ height: "400px" }}>
                  {props.orders.data?.map((order) => (
                    <ProfileOrder key={order.id} order={order} />
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="third" style={{ height: "400px" }}>
                  Binarpay
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default ProfileMenu;
