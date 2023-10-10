import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  function register(values) {
    setIsLoading(true);
    let { data } = axios
      .post(
        `https://sara7aiti.onrender.com/api/v1/user
    `,
        values
      )
      .then((data) => {
        if (data.data.message == "Added") {
          setIsLoading(false);
        }
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        setApiError(err.response.data.error);
      });
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "name must be less than 15 character")
      .required("name is required")
      .min(2, "name must be more than 2 charters"),

    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[a-zA-Z0-9]{3,8}/,
        "password must be small and capital letters and contains at least 1 number"
      ),
    rePassword: Yup.string()
      .required("password is required")
      .oneOf([Yup.ref("password")], "rePassword doesn't match password"),
    age: Yup.number().positive().integer().required("age is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => register(values),
  });
  return (
    <>
      <div className="container my-5">
        <div className="user text-center my-3">
          <i className="far fa-edit user-icon" />
          <h4 className="login ">Register</h4>
          {apiError ? (
            <div className="alert alert-danger w-50 m-auto">{apiError}!</div>
          ) : (
            ""
          )}
        </div>
        <div className="card p-5 w-50 m-auto">
          <form method="POST" onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3 ">
              <label htmlFor="userName" className=" fw-bolder">
                User Name
              </label>
              <input
                className="form-control"
                placeholder="Enter your Name"
                type="text"
                name="name"
                id="userName"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger">{formik.errors.name}</div>
              ) : (
                ""
              )}
            </div>
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

            <div className="form-group mb-3">
              <label htmlFor="rePassword" className=" fw-bolder">
                RePassword
              </label>
              <input
                className="form-control"
                placeholder="Enter your rePassword"
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="age" className=" fw-bolder">
                Age
              </label>
              <input
                className="form-control  "
                placeholder="Enter your age"
                type="number"
                name="age"
                id="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.age && formik.touched.age ? (
                <div className="alert alert-danger">{formik.errors.age}</div>
              ) : (
                ""
              )}
            </div>

            <button type="submit" className="btn btn-dark my-4 w-100 rounded">
              {isLoading ? (
                <i className="fa fa-spin fa-spinner"></i>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
