import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [productData, setProductData] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const getUserFromStorage: any = localStorage.getItem("userData");
  const finalUser = JSON.parse(getUserFromStorage);
  const currentUser = finalUser.auth;
  const server = "http://localhost:8000";
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    return navigate("/");
  };
  useEffect(() => {
    product();
  }, []);

  setTimeout(function () {
    setAlert({
      show: false,
      type: "",
      message: "",
    });
  }, 5000);

  const product = async () => {
    try {
      const res = await fetch(`${server}/products`, {
        headers: {
          authorization: "Bearer " + currentUser,
        },
      });
      const data = await res.json();
      if (data.result === "No Products") return setIsProduct(false);
      setIsProduct(true);
      setProductData(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDelete = async (id: any) => {
    const res = await fetch(`${server}/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + currentUser,
      },
    });
    if (res.status == 200) {
      setAlert({
        show: true,
        type: "success",
        message: "Product deleted Successfully",
      });
      product();
    }
  };

  const handleSearch = async (e: any) => {
    const searchValue = e.target.value;
    if (searchValue.length > 0) {
      const res = await fetch(`${server}/search/${searchValue}`, {
        headers: {
          authorization: "Bearer " + currentUser,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setIsProduct(true);
        setProductData(data);
      } else {
        console.log(res.status);
      }
    } else {
      product();
    }
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} message={alert.message} />}
      <header className="bg-light py-3 border-bottom">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <h1 className="m-0">Welcome!</h1>
            </div>
            <div className="col-auto">
              <button onClick={logoutHandler} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="mt-5">
        <div className="container">
          <div className="row justify-content-between mb-2">
            <div className="col-auto">
              <h3>Your products</h3>
            </div>
            <div className="col-4">
              <input
                type="text"
                placeholder="Search product by Name, Brand, Category"
                className="form-control"
                onChange={handleSearch}
              />
            </div>
            <div className="col-auto">
              <Link to={"/add-product"} className="btn btn-primary">
                Add new Product
              </Link>
            </div>
          </div>
          {!isProduct ? (
            <p className="mt-3 text-center">Product list is empty!</p>
          ) : productData.length < 1 ? (
            <p className="mt-3 text-center">No match found!</p>
          ) : (
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {isProduct &&
                  productData.map((val: any, index: number) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>{val.brand}</td>
                      <td>{val.category}</td>
                      <td className="text-right">
                        <Link
                          to={`edit-product/${val._id}`}
                          className="btn btn-sm btn-primary mx-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(val._id)}
                          className="btn btn-sm btn-danger mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
