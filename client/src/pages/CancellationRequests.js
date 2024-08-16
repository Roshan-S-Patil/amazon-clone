import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { getCancellationRequests } from '../redux/AdminSlice'
import { useNavigate } from 'react-router-dom'
const CancellationRequests = () => {
  const dispatch=useDispatch()  
  const navigate=useNavigate()
  const {cancelationRequests,cancelationRequestsAreLoading}=useSelector(state=>state.admin)
  useEffect(()=>{
    dispatch(getCancellationRequests())
    },[])
  return (
    // 
    <div className='mt-14'>
        <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} >Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} >Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} >Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} >Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} >Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Cancellation Requests</button>
      </div>
       {cancelationRequestsAreLoading?<><div className='w-screen h-screen flex items-center justify-center'><h1 className='text-2xl font-bold
      '>Wait! Loading...</h1></div></>:<> {cancelationRequests===null?<h1 className='text-2xl font-bold
        '>No Cancellation requests...</h1>:<>
        <div className="heading gap-3 grid grid-cols-4 grid-flow-col-dense bg-gray-100 p-3 mt-10">
          <p>RequestId</p>
        <p>Order Id</p>
        <p>Request By</p>
        <p>Status</p>
        </div>
        {cancelationRequests.toReversed().map(req=>{return <div onClick={()=>{navigate(`/admin/individual-cancelation-request/${req._id}`)}} key={req._id} className='hover:cursor-pointer gap-3 grid grid-cols-4 grid-flow-col-dense p-3'>
            <p>{req._id}</p>
            <p>{req.orderId._id}</p>
            <p>{req.orderId.address.name}</p>
            {req.status==="requested"?<p className='text-yellow-600 bg-yellow-200 px-2 rounded-full w-fit'>Requested</p>:<></>}
            {req.status==="accepted"?<p className='text-green-600 bg-green-200 px-2 rounded-full w-fit'>Accepted</p>:<></>}
            {req.status==="denied"?<p className='text-red-600 bg-red-200 px-2 rounded-full w-fit'>Denied</p>:<></>}
        </div>})}
        </>}</>}
     
      
    </div>
  )
}

export default CancellationRequests
