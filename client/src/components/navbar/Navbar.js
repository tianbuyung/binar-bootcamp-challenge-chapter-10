import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavbarComponent = ({ variant, bg = "light" }) => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  return (
    <Navbar variant={variant} bg={bg} expand="lg">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        {isLogin() ? (
          <>
            <Navbar.Brand>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                Cart
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className="cursor-pointer">Logout</div>
            </Navbar.Brand>
          </>
        ) : (
          <>
            <Navbar.Brand>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
            </Navbar.Brand>
            <Navbar.Brand>
              <div
                className="cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </div>
            </Navbar.Brand>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
