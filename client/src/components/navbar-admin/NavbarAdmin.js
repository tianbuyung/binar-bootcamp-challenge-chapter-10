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

	const adminLogout = async () => {
		try {
			const getData = await authservice.logoutAdmin();

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				dispatch(logoutAdmin());
				router.replace("/admin/login");
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
