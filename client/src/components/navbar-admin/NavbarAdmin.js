import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { logoutAdmin } from "../../features/authSlice";
import AuthService from "../../services/AuthService";

const authservice = new AuthService();
const NavbarAdmin = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const adminLogout = () => {
		const response = authservice.logoutAdmin();
		if (response === "success") {
			alert("Successfully logout");
			dispatch(logoutAdmin());
			router.replace("/");
		} else {
			alert("Failed to logout! Please try again!");
		}
	};
	return (
		<Navbar variant={"dark"} bg={"dark"} expand="lg">
			<Container>
				<Navbar.Brand
					onClick={() => router.push("/admin")}
					className="cursor-pointer"
				>
					Home
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
				<Navbar.Brand>
					<div
						className="cursor-pointer"
						onClick={() => router.push("/admin")}
					>
						Product
					</div>
				</Navbar.Brand>
				<Navbar.Brand>
					<div className="cursor-pointer" onClick={adminLogout}>
						Logout
					</div>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default NavbarAdmin;
