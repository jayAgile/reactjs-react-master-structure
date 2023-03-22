import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../Redux/ProductSlice";
import CustomLoader from "../../components/common/loader/CustomLoader";
import { loaderChange } from "../../Redux/ProductSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  const isLoading = useSelector((state) => state.product.isLoading);

  // product list
  useEffect(() => {
    // console.log("userData", userData);
    dispatch(loaderChange(true));
    dispatch(getProductList());
  }, []);
  useEffect(() => {
    setTimeout(() => dispatch(loaderChange(false)), 1000);
  }, [products]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
      <br />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <ul>
          {/* {products?.map((obj) => (
            <li>{obj.title}</li>
          ))} */}
          {/* {[userData].map((obj) => console.log(obj))} */}
        </ul>
      )}
      <h4 style={{ textAlign: "center" }}>
        <Link to="/my-account">My Account</Link>
      </h4>
    </>
  );
};

export default Dashboard;
