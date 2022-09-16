import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";

const RegisterPage = () => {
	const [user, setUser] = useState();
	let navigate = useNavigate();

	const createUser = (e) => {
		e.preventDefault();
		fetch("http://localhost:4000/users", {
			method: "POST",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" },
			redirect: "follow",
		})
			.then((res) => {
				if (res.ok) {
					alert("Successfully create new user");
					navigate("/");
				} else {
					alert("Error! Silahkan cek lagi");
				}
			})
			.catch((err) => {
				alert("Error! Please try again : " + err);
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
					label={"Nama"}
					name={"nama"}
					type={"text"}
					placeholder={"Masukkan nama Anda"}
					onChange={(e) => {
						setUser({ ...user, nama: e.target.value });
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
