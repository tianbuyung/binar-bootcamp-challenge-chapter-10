import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";
import AuthService from "../../services/AuthService";
import Navbar from "../../components/navbar";

const authservice = new AuthService();
const RegisterPage = () => {
	const [user, setUser] = useState();
	let navigate = useNavigate();

	const createUser = async (e) => {
		e.preventDefault();
		try {
			const getData = await authservice.register(user);
			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				navigate("../login", { replace: true });
			} else {
				const message = await getData.json();
				alert(await message.message);
			}
		} catch (err) {
			alert("Error! Please try again");
			console.log("error while send api : " + err.message);
		}
	};

	return (
		<>
			<Navbar variant={"dark"} bg={"dark"} />
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
						min={3}
					/>
					<Forms
						label={"Password"}
						name={"password"}
						type={"password"}
						placeholder={"Masukkan password Anda"}
						onChange={(e) => {
							setUser({
								...user,
								password: e.target.value,
							});
						}}
						min={6}
					/>

					<Button title={"Register"} type={"submit"}>
						Register
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default RegisterPage;
