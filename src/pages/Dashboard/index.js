import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../Redux/ProductSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  // product list
  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      <br />
      <ul>
        {products?.map((obj) => (
          <li>{obj.title}</li>
        ))}
      </ul>
      <h4 style={{ textAlign: "center" }}>
        <Link to="/my-account">My Account</Link>
      </h4>
    </>
  );
};

export default Dashboard;
