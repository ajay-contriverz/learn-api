import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState<any>([
    {
      name: "",
      price: "",
      brand: "",
      category: "",
    },
  ]);
  const location = useLocation();
  const path = location.pathname.split("/");
  const finalPath = path[path.length - 1];

  const currentUser = localStorage.getItem("userData");
  const server = "http://localhost:8000";

  const inputHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductInfo((values: any) => ({ ...values, [name]: value }));
  };

  const product = async () => {
    try {
      const res = await fetch(`${server}/products/${finalPath}`, {
        headers: {
          authorization: "Bearer " + currentUser,
        },
      });
      const data = await res.json();
      setProductInfo(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    product();
  }, []);

  const submitEditProduct = (e: any) => {
    e.preventDefault();
    const resOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + currentUser,
      },
      body: JSON.stringify(productInfo),
    };
    fetch(`${server}/products/${finalPath}`, resOption)
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
          <form className="col-5" onSubmit={submitEditProduct}>
            <h3 className="text-center mb-3">Edit product here</h3>
            <div className="card p-3">
              <div className="form-group mb-3">
                <label>Product name</label>
                <input
                  onChange={inputHandler}
                  className="form-control"
                  autoComplete="off"
                  defaultValue={productInfo.name && productInfo.name}
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
                  defaultValue={productInfo.price && productInfo.price}
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
                  defaultValue={productInfo.brand && productInfo.brand}
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
                  defaultValue={productInfo.category && productInfo.category}
                  type="text"
                  placeholder="Enter here"
                />
              </div>
              <div className="form-group mb-2 text-center">
                <button type="submit" className="btn btn-success">
                  Save Product
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
