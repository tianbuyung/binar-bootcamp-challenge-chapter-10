import { Button, Container, Form } from "react-bootstrap";
import { redirect } from "react-router";
import { useState } from "react";

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
				if (res.ok) {
					alert("Successfully create new user");
					return redirect("/login");
				} else {
					alert("Error! Please try again");
				}
			})
			.catch((err) => {
				console.log("error while send api : " + err.message);
			});
	};

	return (
		<Container>
			<h2 align="center">Daftar Akun</h2>

			<Form onSubmit={createUser} align="left">
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
					label={"Username"}
					name={"username"}
					type={"text"}
					placeholder={"Masukkan username Anda"}
					onChange={(e) => {
						setUser({ ...user, username: e.target.value });
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

				<Button title={"Register"} type={"submit"}>
					Register
				</Button>
			</Form>
		</Container>
	);
};

export default RegisterPage;
