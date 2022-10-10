import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";
import AuthService from "../../services/AuthService";

const authservice = new AuthService();
const LoginAdmin = () => {
	const [user, setUser] = useState();
	let navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		try {
			const getData = await authservice.loginAdmin(user);

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				navigate("../admin", { replace: true });
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
		<Container>
			<h1>Login Admin</h1>
			<Form onSubmit={login} align="left">
				<Forms
					label={"Email"}
					name={"email"}
					type={"email"}
					placeholder={"Masukkan email Anda"}
					onChange={(e) => {
						setUser({ ...user, email: e.target.value });
					}}
				/>
				<Forms
					label={"Password"}
					name={"password"}
					type={"password"}
					placeholder={"Masukkan password Anda"}
					onChange={(e) => {
						setUser({ ...user, password: e.target.value });
					}}
				/>

				<Button title={"login"} type={"submit"}>
					Login
				</Button>
			</Form>
		</Container>
	);
};

export default LoginAdmin;
