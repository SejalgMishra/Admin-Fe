// import React from "react";
// import {
//   BrowserRouter,
//   Route,
//   Routes,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements
// } from "react-router-dom";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Home from "./Pages/Home";
// import AuthLayout from "./layouts/authLayout";
// import MainLayout from "./layouts/mainLayout";

// const App = () => {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//       <Route path="/" element={<AuthLayout />}>
//         <Route index element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Route>
//       <Route path="/main" element={<MainLayout />}>
//         <Route path="/home" element={<Home />} />
//       </Route>
//       </>
//     )
//   );
//   return( 
//   <RouterProvider router={router} /> );
// };

// export default App;
