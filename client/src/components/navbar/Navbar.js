import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../features/authSlice";
import AuthService from "../../services/AuthService";

const authservice = new AuthService();
const NavbarComponent = ({ variant, bg }) => {
	const isUser = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogout = async () => {
		try {
			const getData = await authservice.logoutUser();

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				dispatch(logout());
				navigate("../login", { replace: true });
			} else {
				const message = await getData.json();
				alert(message.message);
			}
		} catch (err) {
			alert("Error! Please try again");
			console.log("error while send api : " + err.message);
		}
	};

	return (
		<Navbar variant={variant} bg={bg} expand="lg">
			<Container>
				<Navbar.Brand
					onClick={() => navigate("/")}
					className="cursor-pointer"
				>
					Home
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isUser ? (
							<>
								<Nav.Link
									onClick={() => navigate("/cart")}
								>
									Cart
								</Nav.Link>
								<Nav.Link>
									<div
										className="cursor-pointer"
										onClick={() =>
											navigate("/profile")
										}
									>
										Profile
									</div>
								</Nav.Link>
								<Nav.Link onClick={userLogout}>
									Logout
								</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link
									onClick={() => navigate("/login")}
								>
									Login
								</Nav.Link>
								<Nav.Link
									onClick={() =>
										navigate("/register")
									}
								>
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
