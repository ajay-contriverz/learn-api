import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function SignUp() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const server = "http://localhost:8000";

  const nameHandler = (e: any) => {
    setAlert({
      show: false,
      type: "",
      message: "",
    });
    setName(e.target.value);
  };
  const emailHandler = (e: any) => {
    setAlert({
      show: false,
      type: "",
      message: "",
    });
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setAlert({
      show: false,
      type: "",
      message: "",
    });
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    if (name.length < 1 || email.length < 1 || password.length < 1) {
      setAlert({
        show: true,
        type: "danger",
        message: "All fields are mandatory!",
      });
    } else if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setAlert({
        show: true,
        type: "danger",
        message: "Email is invalid!",
      });
    } else {
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };
      fetch(`${server}/signup`, requestOption)
        .then((res) => {
          if (res.status == 200) {
            setAlert({
              show: true,
              type: "success",
              message: "Signup successfully!",
            });
            setTimeout(() => {
              return navigate("/");
            }, 2000);
          } else {
            console.log(res.status);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <>
      <section className="position-relative d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
        {alert.show && <Alert type={alert.type} message={alert.message} />}
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-lg-5 col-md-8" onSubmit={onSubmitHandler}>
              <h3 className="text-center mb-3">Sign up!</h3>
              <div className="card p-3">
                <div className="form-group mb-4">
                  <label>Name</label>
                  <input
                    onChange={nameHandler}
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Email</label>
                  <input
                    onChange={emailHandler}
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Password</label>
                  <input
                    onChange={passwordHandler}
                    className="form-control"
                    autoComplete="new-password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="form-group mb-2 text-center">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
                <div className="form-group mb-2 text-center">
                  <p>
                    If you already have an account, login{" "}
                    <Link to={"/"}>Here</Link>.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
