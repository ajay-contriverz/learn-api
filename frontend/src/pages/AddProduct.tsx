import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function AddProduct() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const server = "http://localhost:8000";

  const getUserFromStorage: any = localStorage.getItem("userData");
  const finalUser = JSON.parse(getUserFromStorage);
  const currentUser = finalUser.auth;

  const inputHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setAlert({
      show: false,
      type: "",
      message: "",
    });
    setProductInfo((values) => ({
      ...values,
      [name]: value,
      userId: finalUser.userId,
    }));
  };
  const submitAddProduct = (e: any) => {
    e.preventDefault();
    if (
      !productInfo.hasOwnProperty("name") ||
      !productInfo.hasOwnProperty("price") ||
      !productInfo.hasOwnProperty("brand") ||
      !productInfo.hasOwnProperty("category")
    ) {
      setAlert({
        show: true,
        type: "danger",
        message: "All fields are mandatory!",
      });
    } else {
      const resOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + currentUser,
        },
        body: JSON.stringify(productInfo),
      };
      fetch(`${server}/add-product`, resOption)
        .then((res) => {
          if (res.status == 200) {
            return navigate("/dashboard");
          } else {
            console.log(res.status);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  return (
    <section className="position-relative d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-5" onSubmit={submitAddProduct}>
            <h3 className="text-center mb-3">Add product here</h3>
            <div className="card p-3">
              <div className="form-group mb-3">
                <label>Product name</label>
                <input
                  onChange={inputHandler}
                  className="form-control"
                  autoComplete="off"
                  name="name"
                  type="text"
                  placeholder="Enter here"
                />
              </div>
              <div className="form-group mb-3">
                <label>Price</label>
                <input
                  onChange={inputHandler}
                  className="form-control"
                  name="price"
                  type="number"
                  placeholder="Enter here"
                />
              </div>
              <div className="form-group mb-3">
                <label>Brand</label>
                <input
                  className="form-control"
                  name="brand"
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter here"
                />
              </div>
              <div className="form-group mb-3">
                <label>Category</label>
                <input
                  className="form-control"
                  name="category"
                  onChange={inputHandler}
                  type="text"
                  placeholder="Enter here"
                />
              </div>
              <div className="form-group mb-2 text-center">
                <button type="submit" className="btn btn-success">
                  Add Product
                </button>
              </div>
              <div className="form-group mb-2 text-center">
                <p>
                  Go back to <Link to={"/dashboard"}>Product list</Link>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
