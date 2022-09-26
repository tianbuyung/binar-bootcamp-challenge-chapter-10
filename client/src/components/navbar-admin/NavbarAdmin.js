import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import { API } from "../../configs/config";
const NavbarAdmin = () => {
	const navigate = useNavigate();

	const adminLogout = async () => {
		try {
			const getData = await fetch(API + "/admin/logout", {
				method: "POST",
				redirect: "follow",
				credentials: "include",
			});

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				navigate("/admin/login", { replace: true });
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
					onClick={() => navigate("/admin")}
					className="cursor-pointer"
				>
					Home
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
				<Navbar.Brand>
					<div
						className="cursor-pointer"
						onClick={() => navigate("/admin")}
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
