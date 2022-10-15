import { Button, Container, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import Forms from "../../components/Forms";
import AuthService from "../../services/AuthService";
import { loginAdmin } from "../../features/authSlice";

const authservice = new AuthService();
const LoginAdmin = () => {
	const [user, setUser] = useState();
	let router = useRouter();
	const dispatch = useDispatch();

	const login = async (e) => {
		e.preventDefault();
		try {
			const getData = await authservice.loginAdmin(user);

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				dispatch(loginAdmin());
				localStorage.setItem("tokenAdmmin", response.token);
				router.replace("/admin");
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
