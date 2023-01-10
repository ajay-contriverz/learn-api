import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const server = "http://localhost:8000";

  const nameHandler = (e: any) => {
    setName(e.target.value);
  };
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
        name: name,
        email: email,
        password: password,
      }),
    };
    fetch(`${server}/signup`, requestOption)
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          return navigate("/");
        } else {
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <section className="d-flex align-items-center justify-content-center vh-100 bg-gradient-info">
        <div className="container">
          <div className="row justify-content-center">
            <form className="col-5" onSubmit={onSubmitHandler}>
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
