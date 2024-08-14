import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const navigate=useNavigate()
  const [orders,setOrders]=useState()
  const [ordersLoading,setOrdersLoading]=useState(false)
  useEffect(()=>{
    const getOrders=async()=>{
      setOrdersLoading(true)
      const orders=await axios.get("/order/get-all-orders")
      setOrders(orders.data)
      setOrdersLoading(false)
    }
    getOrders()
  },[])
  return (
    <div className='mt-14'>
        <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} >Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} className=''>Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} className=''>Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} className=''>Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}}>Cancellation Requests</button>
      </div>
       {ordersLoading?<><div className='w-screen h-screen flex items-center justify-center'><h1 className='text-2xl font-bold
      '>Wait! Loading...</h1></div></>:<></>}
      <div className="heading gap-3 grid grid-cols-4 grid-flow-col-dense bg-gray-100 p-3 mt-10">
        <p>Satus</p>
      <p>Order ID</p>
      <p>Name</p>
      <p>Selling Price</p>
      </div>
      {orders?.toReversed().map(order=>{return <div className='grid grid-cols-4 gap-3 p-3'>
        {order.status==="processing"?<p className='bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full'>{order.status}</p>:<></>}
              {order.status==="cancelling"?<p className='bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full'>{order.status}</p>:<></>}
              {order.status==="shipped"?<p className='bg-sky-100 text-sky-600 w-fit px-2 rounded-full'>{order.status}</p>:<></>}
              {order.status==="delivered"?<p className='bg-green-100 text-green-600 w-fit px-2 rounded-full'>{order.status}</p>:<></>}
        <p className='hover:cursor-pointer overflow-hidden'> <a onClick={()=>{navigate(`/admin/manage-order/${order._id}`)}}> {order._id}</a></p>
        <p>{order.address.name.split(" ")[0]}</p>
        <p>{order.amount}</p>
      </div>})}
    </div>
  )
}

export default Orders
