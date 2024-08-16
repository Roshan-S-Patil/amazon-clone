import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate()
  return (
    <div className='mt-14 flex flex-col max-w-6xl mx-auto'  >
        <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} className=''>Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} className=''>Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} className=''>Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} className=''>Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}}>Cancellation Requests</button>
      </div>
    </div>
  )
}

export default Dashboard

// 