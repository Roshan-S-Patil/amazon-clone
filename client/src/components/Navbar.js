import React, { useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux';
import { fetchUser,setCurrentUser,setCart } from '../redux/userSlice';
const Navbar = () => {
  const {currentUser,cart}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()

useEffect(()=>{
  const user= localStorage.getItem("user");
  const localCart= localStorage.getItem("cart");
  if(user){
    dispatch(setCurrentUser(user))
  }
  if(localCart){
    dispatch(setCart(localCart))
  }
},[])

  return (
    <div className='w-full bg-[rgb(19,25,33)]   fixed z-20'>
      <div className=" h-14 nav-container max-w-6xl grid grid-cols-2 items-center mx-auto">
      <div className="text-white text-2xl font-bold  ">
       <h1 className='hover:cursor-pointer ' onClick={()=>navigate("/")}>Clone</h1>
      </div>
      <div className=' w-full text-white flex gap-3 justify-evenly font-bold m-auto '>
        <div>{currentUser?<button onClick={()=>{navigate("/profile")}}>Profile</button>:<button onClick={()=>{navigate("/login")}}>Login</button>}</div>
        <div>{currentUser?.role==="admin"?<button onClick={()=>{navigate("/admin/dashboard")}}>Dashboard</button>:<></>}</div>
        <div className='hover:cursor-pointer flex items-center justify-center gap-1' onClick={()=>navigate("/cart")}>
        Cart
          <p className=' bg-red-600 rounded-full w-5 h-5 flex items-center justify-center'>{cart?.length}</p>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar

// 