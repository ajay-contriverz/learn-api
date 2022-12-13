import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/login";
    const { data: res } = await axios.post(url, data);
    console.log(res);
    if (res) {
      localStorage.setItem("users", JSON.stringify(res));
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h1>Login</h1>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
