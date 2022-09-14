import { Button, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import Forms from "../../components/Forms";

const RegisterPage = () => {
	const [user, setUser] = useState();

	const createUser = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/users/register", {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				res.json();
			})
			.then((json) => setUser(json.user))
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
					onChange={(e) => {
						setUser({ ...user, email: e.target.value });
					}}
				/>
				<Forms
					label={"username"}
					name={"username"}
					type={"text"}
					placeholder={"Masukkan username Anda"}
					onChange={(e) => {
						setUser({ ...user, username: e.target.value });
					}}
				/>
				<Forms
					label={"password"}
					name={"password"}
					type={"password"}
					placeholder={"Masukkan password Anda"}
					onChange={(e) => {
						setUser({ ...user, password: e.target.value });
					}}
				/>

				<Button title={"Register"} type={"submit"}>
					Register
				</Button>
			</Form>
		</Container>
	);
};

export default RegisterPage;
