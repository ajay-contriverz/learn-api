import { type } from "os";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [productData, setProductData] = useState([]);
  const [isProduct, setIsProduct] = useState(false);
  const currentUser = localStorage.getItem("userData");
  const server = "http://localhost:8000";
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userData");
    return navigate("/");
  };
  useEffect(() => {
    product();
  }, []);

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
  return (
    <>
      <section className="bg-light py-3">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-auto">
              <h1>Successfully logged in</h1>
            </div>
            <div className="col-auto">
              <button onClick={logoutHandler} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="container">
          <div className="row justify-content-between mb-2">
            <div className="col-auto">
              <h3>Your products</h3>
            </div>
            <div className="col-auto">
              <Link to={"/add-product"} className="btn btn-primary">
                Add new Product
              </Link>
            </div>
          </div>
          {!isProduct ? (
            <p className="text-center">Product not found!</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">price</th>
                  <th scope="col">Brand</th>
                  <th scope="col">category</th>
                  <th scope="col">action</th>
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
                      <td>
                        <Link
                          to={`edit-product/${val._id}`}
                          className="btn btn-sm btn-primary mx-1"
                        >
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-danger mx-1">
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
