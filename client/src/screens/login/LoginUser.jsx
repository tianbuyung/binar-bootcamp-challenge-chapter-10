import { Button, Container, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Forms from "../../components/Forms";
import AuthService from "../../services/AuthService";
import Navbar from "../../components/navbar";
import { useRouter } from 'next/router'
import withNoAuth from '../../hoc/withNoAuth';
const authservice = new AuthService();
const LoginUser = () => {
	const [user, setUser] = useState();
	// let navigate = useNavigate();
	 const router = useRouter()

	const login = async (e) => {
		e.preventDefault();
		try {
			const getData = await authservice.loginUser(user);

			if (getData.status === 200) {
				const response = await getData.json();
				alert(response.message);
				// navigate("../profile", { replace: true });
				localStorage.setItem('token', response.token);
				router.push('/')
			} else {
				const response = await getData.json();
				alert(await meresponsessage.message);
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
				<h1>Login User</h1>
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
							setUser({
								...user,
								password: e.target.value,
							});
						}}
					/>

					<Button title={"login"} type={"submit"}>
						Login
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default withNoAuth(LoginUser);
