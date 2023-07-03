import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <div><h1 className='text-4xl text-blue-600 text-center font-bold pt-8'>Shopping Page</h1></div>
    <Outlet/>
    </>
  )
}

export default AuthLayout