import { Button, Container, Form } from "react-bootstrap";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";

const LoginPage = () => {
	const [user, setUser] = useState();
	let navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		try {
			const getData = await fetch(
				process.env.REACT_APP_SERVER + "/users/login",
				{
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-Type": "application/json" },
					redirect: "follow",
				}
			);

			if (getData.status === 200) {
				alert("Successfully login");
				const token = await getData.json();
				document.cookie = "token =" + token.token;
				navigate("/");
			} else if (getData.status === 404) {
				alert("Email is not found, please try again");
			} else if (getData.status === 401) {
				alert("Wrong email or password, please try again");
			}
		} catch (err) {
			alert("Error! Please try again");
			console.log("error while send api : " + err.message);
		}
	};

	return (
		<Container>
			<h1>Login Page</h1>
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

export default LoginPage;
