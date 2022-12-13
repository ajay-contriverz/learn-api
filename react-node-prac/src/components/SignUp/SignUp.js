import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  //   const [userName, setUserName] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();

  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  //   useEffect(() => {
  //     console.log(userName, email, password);
  //   }, [userName, email, password]);

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/signup";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      if (res) {
        setData("");
        localStorage.setItem("users", JSON.stringify(res));
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2>SignUp</h2>
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter Name"
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
          <Button variant="primary" type="submit" onClick={saveData}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
