import React, { useEffect } from 'react'
import { MdPerson } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setCurrentUser } from '../redux/userSlice';


const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {_id}=useParams()
  const user=useSelector(state=>state.user.currentUser)
  useEffect(()=>{
    const user=localStorage.getItem("user")
    if(!user){
      dispatch(fetchUser())
    }
    if(user){
      dispatch(setCurrentUser(user))
    }
  },[])
  return (
    <div className="Profile p-2 md:p-10 mt-14">
 <div className="personal-details bg-gray-100 p-4 md:p-10 mb-10 rounded-xl flex items-center" >
 <MdPerson className='fill-gray-400 size-10 md:size-20 mr-5  border-2 border-gray-400 rounded-full md:p-2' />
  <div className="details-text">
     <p>{user?.name}</p>
    <p>{user?.email}</p>
    <p>{user?.phone}</p>
    </div>
    </div>
    <div className=' md:grid grid-cols-2  items-center justify-center gap-10 '>
      <div onClick={()=>{navigate("/profile/your-orders")}} className="hover:cursor-pointer hover:bg-gray-200 your-orders my-5 bg-gray-100 p-10 rounded-xl md:my-0">
        <h3>Your Orders</h3>
        <p>Track, return or buy things again</p>
      </div>
      <div onClick={()=>{navigate(`/profile/login-and-security/${user?._id}`)}} className="hover:cursor-pointer hover:bg-gray-200  your-orders my-5 bg-gray-100 p-10 rounded-xl md:my-0">
      <h3>Login & Security</h3>
      <p>Edit login, name, and mobile number</p>
      </div>
      <div onClick={()=>{navigate("/profile/addresses")}} className="hover:cursor-pointer hover:bg-gray-200   your-orders my-5 bg-gray-100 p-10 rounded-xl md:my-0">
      <h3>Your Addresses</h3>
      <p>Edit addresses for orders and gifts</p>
      </div>
      <div className="hover:cursor-pointer hover:bg-gray-200 your-orders my-5 bg-gray-100 p-10 rounded-xl md:my-0">
      <h3>Contact Us</h3>
      <p>Get solutions for your Doubts</p>
      </div>
    </div>
    <div className="you-may-like flex gap-24 overflow-x-scroll">
      {/* <ProductCardVertical/>
      <ProductCardVertical/>
      <ProductCardVertical/>
      <ProductCardVertical/>
      <ProductCardVertical/>
      <ProductCardVertical/>
      <ProductCardVertical/> */}
    </div>
    </div>
  )
}

export default Profile