import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    brand: "",
    userId: "",
    category: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("users"));
    if (auth) {
      console.log(auth._id);
      setData({ ...data, userId: auth._id });
    }
    console.log(data);
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!data.name || !data.price || !data.brand || !data.category) {
      setError(true);
      return false;
    }
    const url = "http://localhost:8000/add-product";
    const { data: res } = await axios.post(url, data);
    console.log(res);
    // if (res) {
    //   localStorage.setItem("users", JSON.stringify(res));
    //   navigate("/");
    // }
  };
  return (
    <div>
      <div className="text-center">
        <h2>Add Product</h2>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Form
          style={{
            width: "30%",
            padding: "20px",
            margin: "20px",
            backgroundColor: "aquamarine",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter product Name"
              onChange={handleChange}
            />
            {error && !data.name && (
              <Form.Text className="text-muted">* Name is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              onChange={handleChange}
              placeholder="Enter Product Price"
            />
            {error && !data.price && (
              <Form.Text className="text-muted">* Price is required</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductBrand">
            <Form.Label>Product Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              onChange={handleChange}
              placeholder="Enter Product Brand"
            />
            {error && !data.brand && (
              <Form.Text className="text-muted">* Brand is required</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProductCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              onChange={handleChange}
              placeholder="Enter Product Category"
            />
            {error && !data.category && (
              <Form.Text className="text-muted">
                * category is required
              </Form.Text>
            )}
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary" type="submit" onClick={addProduct}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
