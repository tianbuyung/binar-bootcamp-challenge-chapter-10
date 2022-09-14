import { Container, Form } from "react-bootstrap";
import { useState } from "react";

import Forms from "../../components/Forms";
import Button from "../../components/button/index";

const RegisterPage = () => {
	const [user, setUser] = useState();

	const createUser = () => {
		fetch("localhost:4000/user/register", {
			method: "POST",
			body: JSON.stringify(user),
		})
			.then((res) => {
				res.json();
			})
			.catch((err) => {
				console.log("error while send api : " + err);
			});
	};

	return (
		<Container>
			<h2 align="center">Daftar</h2>

			<Form onSubmit={createUser}>
				<Forms
					label={"email"}
					name={"email"}
					type={"email"}
					placeholder={"Masukkan email Anda"}
				/>
				<Forms
					label={"username"}
					name={"username"}
					type={"text"}
					placeholder={"Masukkan username Anda"}
				/>
				<Forms
					label={"password"}
					name={"password"}
					type={"password"}
					placeholder={"Masukkan password Anda"}
				/>

				<Button title={"Register"}>Register</Button>
			</Form>
		</Container>
	);
};

export default RegisterPage;
