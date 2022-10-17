import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../features/authSlice";
import Forms from "../../components/Forms";
import AuthService from "../../services/AuthService";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import { withNoAuth } from "../../hoc/withNoAuth";

const authservice = new AuthService();
const LoginUser = () => {
	const [user, setUser] = useState();
	const router = useRouter();
	const dispatch = useDispatch();

	const loginUser = async (e) => {
		e.preventDefault();
		try {
			const getData = await authservice.loginUser(user);

			if (getData.status === 200) {
				const response = await getData.json();
				alert(response.message);
				dispatch(login());
				localStorage.setItem("token", response.token);
				router.push("/");
			} else {
				const response = await getData.json();
				alert(await response.message);
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
				<Form onSubmit={loginUser} align="left">
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
