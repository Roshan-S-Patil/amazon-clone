import React from 'react'
import { useNavigate } from 'react-router-dom'

const Reviews = () => {
  const navigate=useNavigate()
  return (
    <div className='mt-14'>
         <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} >Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} >Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} >Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} >Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}}>Cancellation Requests</button>
      </div>
    </div>
  )
}

export default Reviews
// 