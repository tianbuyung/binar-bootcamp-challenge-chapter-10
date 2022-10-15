import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/authSlice";
import AuthService from "@services/AuthService";

const authservice = new AuthService();
const NavbarComponent = ({ variant, bg }) => {
	const isUser = useSelector((state) => {
		return state.auth.isUser;
	});
	const dispatch = useDispatch();
	const router = useRouter();

	const userLogout = () => {
		const response = authservice.logoutUser();
		if (response === "success") {
			alert("Successfully logout");
			dispatch(logout());
			router.replace("/login");
		} else {
			alert("Failed to logout! Please try again!");
		}
	};

	return (
		<Navbar variant={variant} bg={bg} expand="lg">
			<Container>
				<Navbar.Brand
					onClick={() => router.push("/")}
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
									onClick={() =>
										router.push("/cart")
									}
								>
									Cart
								</Nav.Link>
								<Nav.Link>
									<div
										className="cursor-pointer"
										onClick={() =>
											router.push("/profile")
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
									onClick={() =>
										router.push("/login")
									}
								>
									Login
								</Nav.Link>
								<Nav.Link
									onClick={() =>
										router.push("/register")
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
