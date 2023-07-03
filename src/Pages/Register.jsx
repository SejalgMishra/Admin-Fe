import React, { useEffect, useRef } from "react";
import axios from "axios";
import  AxiosInstance from "../utilities/AxiosInstance";
import { Form, Formik } from "formik";
import axiosInstance from "../utilities/AxiosInstance";
import { json, redirect, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main")
    }
  }, [])
  
  return (
    <div>
      <Formik
      initialValues={{
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:""
      }}

      onSubmit={async(values) => {
        try {
          const res = await axiosInstance.post('/',values)
          console.log(res)
          window.localStorage.setItem("token" , JSON.stringify(res.token))
          navigate("/login")

          
          
        } catch (error) {
          
        }

      }}
      
      >
     {({values, handleChange, handleSubmit , actions}) => ( 
     <Form  onSubmit={handleSubmit} onChange={handleChange}>
        <div className="flex flex-col items-center gap-5 py-20 max-w-lg mx-auto ">
        <h1 className="text-2xl font-bold">Register Page</h1>

          <input
            name="name"
            value={values.name}
            placeholder="Your Full Name"
            onChange={handleChange}
            className="p-2 border-2 w-full px-4 border-gray-700 rounded-l-none"
            type="text"
            
          />
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
          <input
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="p-2 border-2 w-full border-gray-700 rounded-l-none"
            type="password"
            
          />
          <input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="Your Phone number"
            className="p-2 border-2 w-full border-gray-700 rounded-l-none"
            type="tel"
            
          />
          <button
            type="submit"
            className="p-2 border-2 w-full border-gray-700 bg-blue-700 rounded-l-none text-white"
          >
            Submit
          </button>
        </div>
      </Form>)}
      </Formik>
    </div>
  );
};

export default Register;
