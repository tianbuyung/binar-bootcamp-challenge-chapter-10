import { useState } from "react";
import AddProduct from "./components/addProduct/AddProduct";
import ListProduct from "./components/addProduct/ListProduct";

const Admin = () => {
  const [isFetching, setIsFetching] = useState(false);
  return (
    <>
      <AddProduct setIsFetching={setIsFetching} />
      <ListProduct isFetching={isFetching} setIsFetching={setIsFetching} />
    </>
  );
};

export default Admin;
