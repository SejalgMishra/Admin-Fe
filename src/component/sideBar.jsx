import React from "react";
import {
  AiOutlineShop,
  AiOutlineUnorderedList,
  AiOutlineTeam,
  AiOutlineTags
} from "react-icons/ai";
import {
  useLocation,
} from "react-router-dom";

const inactive = "flex items-center gap-2 text-lg font-bold  text-white mr-4";
const active =
  "bg-white rounded-l-2xl flex items-center gap-2 text-lg font-bold p-1 ";

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <aside className=" bg-blue-950 flex flex-col  p-5 pr-0 h-screen  ">
        <nav className="flex flex-col gap-3  top-0 left-0">
          <a
            href="/main"
            className={location.pathname === "/main" ? active : inactive}
          >
            {" "}
            <AiOutlineShop /> <span>Dashboard</span>
          </a>
          <a
            href="/main/category"
            className={
              location.pathname === "/main/category" ? active : inactive
            }
          >
            {" "}
            <AiOutlineUnorderedList /> <span>Category</span>
          </a>
          <a
            href="/main/product"
            className={
              location.pathname === "/main/product" ? active : inactive
            }
          >
            {" "}
            <AiOutlineTags /> <span>Products</span>
          </a>
          <a
            href="/main/user"
            className={location.pathname === "/main/user" ? active : inactive}
          >
            {" "}
            <AiOutlineTeam /> <span>User</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
