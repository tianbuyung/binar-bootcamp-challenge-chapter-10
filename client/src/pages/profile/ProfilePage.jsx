const ProfilePage = () => {
	const getCookie = document.cookie;
	return (
		<div>
			Ini ProfilePage Page <br /> test cookie ={" "}
			{getCookie.split("token=")}
		</div>
	);
};

export default ProfilePage;
