import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const server = "http://localhost:8000";

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
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
      .then((json) => {
        if (json.result) {
          setErrorMsg(json.result);
        }
        if (!json.result) {
          return navigate("dashboard");
        }
      });
  };

  return (
    <>
      <section className="d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-5" onSubmit={onSubmitHandler}>
              <h3 className="text-center mb-3">Login to your account!</h3>
              <div className="card p-3">
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <div className="form-group mb-4">
                  <label>Email</label>
                  <input
                    onChange={emailHandler}
                    className="form-control"
                    autoComplete="off"
                    type="email"
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
