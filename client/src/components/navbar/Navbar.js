import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { API } from "../../configs/config";
const NavbarComponent = ({ variant, bg }) => {
	const { isLogin } = useAuth();
	const navigate = useNavigate();

	const userLogout = async () => {
		try {
			const getData = await fetch(API + "/users/logout", {
				method: "POST",
				redirect: "follow",
				credentials: "include",
			});

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
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
							<div
								className="cursor-pointer"
								onClick={userLogout}
							>
								Logout
							</div>
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
