import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const server = "http://localhost:8000";
  const inputHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductInfo((values) => ({ ...values, [name]: value }));
  };
  const submitAddProduct = (e: any) => {
    const currentUser = localStorage.getItem("userData");
    e.preventDefault();
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
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
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
