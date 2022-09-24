import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import useAuth from "../../hooks/useAuth";

const NavbarComponent = ({ variant, bg = "light" }) => {
  const { isLogin } = useAuth();
  return (
    <Navbar variant={variant} bg={bg} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        {isLogin() ? (
          <>
            <Navbar.Brand>
              <div className="cursor-pointer">Profile</div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className="cursor-pointer">Logout</div>
            </Navbar.Brand>
          </>
        ) : (
          <>
            <Navbar.Brand>
              <div className="cursor-pointer">Login</div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className="cursor-pointer">Register</div>
            </Navbar.Brand>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
