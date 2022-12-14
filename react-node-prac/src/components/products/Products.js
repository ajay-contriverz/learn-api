import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  //fetch products list
  const fetchProductList = async () => {
    const response = await fetch("http://localhost:8000/products", {
      headers: {
        authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const res = await response.json();
    console.log(res);
    setProducts(res);
  };

  //delete product
  const deleteProduct = async (id) => {
    console.log(id);
    const response = await axios.delete(
      `http://localhost:8000/products/${id}`,
      {
        headers: {
          authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    if (response) {
      fetchProductList();
    }
  };

  //handle search
  const handleSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      const res = await fetch(`http://localhost:8000/search/${key}`, {
        headers: {
          authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const result = await res.json();
      if (result) {
        console.log(result);
        setProducts(result);
      }
    } else {
      fetchProductList();
    }
  };

  return (
    <div className="text-center product-list">
      <h2 className="fw-bold">Products</h2>
      <div className="d-flex align-items-center justify-content-center">
        <InputGroup className="mb-3" style={{ width: "40%" }}>
          <Form.Control
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
          />
        </InputGroup>
      </div>
      <div>
        <ul className="fw-bold">
          <li>S. No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Brand</li>
          <li>Category</li>
          <li>Operation</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.brand}</li>
              <li>{item.category}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>{" "}
                <Link to={`/update/${item._id}`}>Update </Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
    </div>
  );
}

export default Products;
