import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

const Test = () => {
	let router = useRouter();

	const logout = async () => {
		try {
			const getData = await fetch("/users/logout", {
				method: "POST",
				redirect: "follow",
				credentials: "include",
			});

			if (getData.status === 200) {
				const message = await getData.json();
				alert(message.message);
				router.replace("../login");
			} else {
				const message = await getData.json();
				alert(message.message);
			}
		} catch (err) {
			alert("Error! Please try again");
			console.log("error while send api : " + err.message);
		}
	};

	const testCookie = async () => {
		const getData = await fetch("/carts", {
			method: "GET",
			redirect: "follow",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log("status - messages = ", getData.status, getData.message);
	};

	return (
		<Container>
			<h1>Test Cookie and passport, harus sudah login</h1>
			test tembak cookie ={" "}
			<button onClick={testCookie}>Test Cookie</button>
			<br />
			<button onClick={logout}>Logout</button>
		</Container>
	);
};

export default Test;
