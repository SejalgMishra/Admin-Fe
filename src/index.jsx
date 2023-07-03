import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Login from "./Pages/Login"; 
import Register from "./Pages/Register";
import AuthLayout from "./layouts/authLayout";
import MainLayout from './layouts/mainLayout';
import Home from './Pages/Home';
import SideBar from './component/sideBar';
import Category from './Pages/Category';
import Product from './Pages/Product';
import User from './Pages/User';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<AuthLayout />}>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/main" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='category' element={<Category />} />
        <Route path='product' element={<Product />} />
        <Route path='user' element={<User />} />



      </Route>
      </>
  )
);


 ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <RouterProvider router={router} /> 
  </React.StrictMode>

);

