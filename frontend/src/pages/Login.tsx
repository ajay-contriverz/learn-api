import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Login() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const server = "http://localhost:8000";

  useEffect(() => {
    const hasUser = localStorage.getItem("userData");
    // console.log(currentUser);
    if (hasUser) {
      return navigate("dashboard");
    }
  }, []);

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
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(`${server}/login`, requestOption)
      .then((res) => res.json())
      .then((user) => {
        if (user.result) {
          setAlert({
            show: true,
            type: "danger",
            message: user.result,
          });
        }
        if (user.auth) {
          const currentUser: any = {
            auth: user.auth,
            userId: user.user._id,
          };

          localStorage.setItem("userData", JSON.stringify(currentUser));
          setAlert({
            show: true,
            type: "success",
            message: "Logged in successfully!",
          });
          setTimeout(() => {
            return navigate("dashboard");
          }, 2000);
        }
      });
  };

  return (
    <>
      <section className="position-relative d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
        {alert.show && <Alert type={alert.type} message={alert.message} />}
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-5" onSubmit={onSubmitHandler}>
              <h3 className="text-center mb-3">Login to your account!</h3>
              <div className="card p-3">
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
                    Login
                  </button>
                </div>
                <div className="form-group mb-2 text-center">
                  <p>
                    If you don't have an account, signup{" "}
                    <Link to={"signup"}>Here</Link>.
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
