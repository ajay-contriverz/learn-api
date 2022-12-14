import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    brand: "",
    userId: "",
    category: "",
  });
  const [error, setError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.id);
    preFillData();
    // console.log(data);
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const preFillData = async () => {
    const response = await fetch(
      `http://localhost:8000/products/${params.id}`,
      {
        headers: {
          authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const res = await response.json();
    console.log(res);
    setData({
      ...data,
      name: res.name,
      price: res.price,
      brand: res.brand,
      userId: res.userId,
      category: res.category,
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.brand || !data.category) {
      setError(true);
      return false;
    }
    const { data: res } = await axios.put(
      `http://localhost:8000/products/${params.id}`,
      data,
      {
        headers: {
          authorization: ` bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    // console.log(res);
    if (res) {
      alert("Product Updated Successfully");
      navigate("/");
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2>Update Product</h2>
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
              value={data.name || ""}
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
              value={data.price || ""}
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
              value={data.brand || ""}
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
              value={data.category || ""}
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
          <Button variant="primary" type="submit" onClick={updateProduct}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
