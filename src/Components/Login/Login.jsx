import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { tokenContext } from "../../Context/tokenContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  let { setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  function login(values) {
    setIsLoading(true);
    let { data } = axios
      .post(
        `https://sara7aiti.onrender.com/api/v1/user/signin

    `,
        values
      )
      .then((data) => {
        console.log(data);
        if (data.data.message === "welcome") {
          setIsLoading(false);
          localStorage.setItem("userToken", data.data.token);
          setToken(data.data.token);
          navigate("/profile");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err.response.data.error);
      });
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[a-zA-Z0-9]{3,8}/,
        "password must be small and capital letters and contains at least 1 number"
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => login(values),
  });
  return (
    <>
      <div className="container my-5">
        <div className="user text-center my-3">
          <i className="far fa-edit user-icon" />
          <h4 className="login ">Login</h4>
          {apiError ? (
            <div className="alert alert-danger w-50 m-auto">{apiError}!</div>
          ) : (
            ""
          )}
        </div>
        <div className="card p-5 w-50 m-auto">
          <form method="POST" onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className=" fw-bolder">
                Email
              </label>
              <input
                className="form-control my-2 "
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className=" fw-bolder">
                Password
              </label>
              <input
                className="form-control  "
                placeholder="Enter your Password"
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>

            <button type="submit" className="btn btn-dark my-4 w-100 rounded">
              {isLoading ? (
                <i className="fa fa-spin fa-spinner"></i>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
