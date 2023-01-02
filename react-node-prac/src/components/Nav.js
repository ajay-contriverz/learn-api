import React from "react";
import "../App.css";

import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Product</Link>
          </li> */}
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name}){" "}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-bar" style={{ textAlign: "right" }}>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
