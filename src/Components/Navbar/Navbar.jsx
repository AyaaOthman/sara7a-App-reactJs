import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CounterContext } from "../../Context/counter";
import { tokenContext } from "../../Context/tokenContext";
import logo from "../../img/logo300.png";

export default function Navbar() {
  const { counter } = useContext(CounterContext);
  const { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    // navigate("/login");
    window.location.href = "/";
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <img
            src={logo}
            alt="logo"
            className=" navbar-brand"
            width={"100px"}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                      <div className="badge text-bg-danger">{counter}</div>
                    </Link>
                  </li>

                  <button className="btn btn-dark" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
