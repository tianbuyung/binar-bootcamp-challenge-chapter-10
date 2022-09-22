import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
	let navigate = useNavigate();
	const getCookie = document.cookie;

	const logout = async () => {
		try {
			const getData = await fetch(
				process.env.REACT_APP_SERVER + "/users/logout",
				{
					method: "POST",
					redirect: "follow",
					credentials: "include",
				}
			);

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

	const testCookie = async () => {
		const getData = await fetch(
			process.env.REACT_APP_SERVER + "/admin/products",
			{
				method: "GET",
				redirect: "follow",
				credentials: "include",
			}
		);

		console.log("status - messages = ", getData.status, getData.message);
	};

	return (
		<Container>
			Ini ProfilePage Page <br /> test cookie ={" "}
			{getCookie.split("token=")}
			<br />
			test tembak cookie ={" "}
			<button onClick={testCookie}>Test Cookie</button>
			<br />
			<button onClick={logout}>Logout</button>
		</Container>
	);
};

export default ProfilePage;
