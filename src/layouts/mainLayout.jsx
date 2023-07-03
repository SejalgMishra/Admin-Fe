import React, {  useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../component/sideBar";

const MainLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])
  
  return (
    <>
      <div className="flex ">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
