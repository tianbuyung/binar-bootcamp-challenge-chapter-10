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

	return (
		<div>
			Ini ProfilePage Page <br /> test cookie ={" "}
			{getCookie.split("token=")}
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default ProfilePage;
