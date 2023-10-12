import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { tokenContext } from "../../Context/tokenContext";
import logo from "../../img/logo300.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllMsgs } from "../../redux/msgsSlice";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    window.location.href = "/";
  }
  useEffect(() => {
    dispatch(getAllMsgs());
  }, []);
  const msgs = useSelector((state) => state.counter.msgs);

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
                      <div className="badge text-bg-danger">{msgs?.length}</div>
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
