import { Form, Formik } from "formik";
import React from "react";
import axiosInstance from "../utilities/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={async(values) => {
          try {
            const res = await axiosInstance.post("/login", values);
            console.log(res);
            window.localStorage.setItem("token" , JSON.stringify(res.token))

            if (res.token) {
              navigate("/main");
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit , errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="flex flex-col items-center gap-5 py-20 max-w-lg mx-auto ">
              <h1 className="text-2xl font-bold">Login Page</h1>

              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-2 border-2 w-full border-gray-700 rounded-l-none"
                type="email"
              />
              <input
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Your password"
                className="p-2 border-2 w-full border-gray-700 rounded-l-none"
                type="password"
              />
              <button
                type="submit"
                className="p-2 border-2 w-full border-gray-700 bg-blue-700 rounded-l-none text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
