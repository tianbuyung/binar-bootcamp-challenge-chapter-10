import { useState } from "react";
import NavbarAdmin from "../../components/navbar-admin/NavbarAdmin";
import AddProduct from "./components/addProduct/AddProduct";
import ListProduct from "./components/addProduct/ListProduct";

const Admin = () => {
	const [isFetching, setIsFetching] = useState(false);
	return (
		<>
			<NavbarAdmin />
			<AddProduct setIsFetching={setIsFetching} />
			<ListProduct
				isFetching={isFetching}
				setIsFetching={setIsFetching}
			/>
		</>
	);
};

export default Admin;
