import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";

const LoginPage = () => {
	const [user, setUser] = useState();
	let navigate = useNavigate();

	const login = (e) => {
		e.preventDefault();
		fetch(process.env.REACT_APP_SERVER + "/users/login", {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
			redirect: "follow",
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Successfully login");
					navigate("/");
				} else if (res.status === 404) {
					alert("Email is not found, please try again");
				} else if (res.status === 401) {
					alert("Wrong email or password, please try again");
				}
			})
			.catch((err) => {
				alert("Error! Please try again");
				console.log("error while send api : " + err.message);
			});
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

				<Button title={"register"} type={"submit"}>
					Register
				</Button>
			</Form>
		</Container>
	);
};

export default LoginPage;
