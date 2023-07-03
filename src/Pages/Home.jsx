import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token);
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }
  
  return (
  <div className='m-5 w-full'>
    <div className='flex justify-between mt-20 items-center gap-36'>
      <h1 className='text-blue-950 text-3xl' >
      Welcome to the Dashboard !
      </h1>
      <button className='p-2 px-4 border-2 bg-blue-950 text-white rounded-full' onClick={logout}>LogOut</button>
    </div>

  </div>
  )
}

export default Home