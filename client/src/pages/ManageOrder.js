import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeOrderStatus, fetchIndividualOrder } from '../redux/AdminSlice';

const ManageOrder = () => {
  const dispatch=useDispatch()
  const [changingStatus,setChangingStatus]=useState(false)
  const [status,setStatus]=useState(null)
  const {individualOrder}=useSelector(state=>state.admin)
    const {orderId}=useParams()
    useEffect(()=>{
       dispatch(fetchIndividualOrder(orderId))
    },[orderId])
  return (
    <div className='mt-14 max-w-6xl mx-auto'>
        <hr />
      {individualOrder?<>
      <div className="products">
        <div className='bg-gray-100 grid grid-cols-3 gap-4'>
          <p>Product Id</p>
          <p>Product Name</p>
          <p>Quantity</p>
        </div>
        {individualOrder.products.map(product=>{
          return (<div className='grid grid-cols-3 gap-4'>
            <p>{product._id}</p>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
          </div>)
        })}  
      </div>
    <hr />
        <div className="address">
        <h1 className='text-2xl font-bold'>Shipping Address</h1>
        <p>{individualOrder.address.name}</p>
        <p>{individualOrder.address.phone}</p>
        <p>{individualOrder.address.addressLine1}</p>
        <p>{individualOrder.address.addressLine2}</p>
        <p>{individualOrder.address.landmark}</p>
        <p>{individualOrder.address.city}, {individualOrder.address.pincode}</p>
        <p></p>
       </div>
    <hr />
       <div className="change-order-status">
        <h1 className='text-2xl font-bold pt-5' >Status</h1>
        {individualOrder.status==="processing"?<p className='px-3 bg-yellow-200 text-yellow-600 rounded-full w-fit'>Processing</p>:<></>}
        {individualOrder.status==="shipped"?<p className='px-3 bg-yellow-200 text-yellow-600 rounded-full w-fit'>Shipped</p>:<></>}
        {individualOrder.status==="delivered"?<p className='px-3 bg-green-200 text-green-600 rounded-full w-fit'>Delivered</p>:<></>}
        
        {changingStatus?<>
          {individualOrder.status==="processing"?<>
        <input type="radio" name="status" id="shipped" onClick={()=>{setStatus("shipped")}}/>
        <label className='mx-2' htmlFor="shipped">Shipped</label> <br />
        <input type="radio" name="status" id="delivered" onClick={()=>{setStatus("delivered")}}/>
        <label className='mx-2' htmlFor="delivered">Delivered</label>
        <br />
        <button onClick={()=>{
          if(status){
            dispatch(changeOrderStatus({orderId:individualOrder._id,status:status}))}}
          }
           className='p-3 rounded-lg bg-gray-100 hover:bg-gray-200' >Change</button>
        </>:<></>}
        {individualOrder.status==="shipped"?<>
        <input type="radio" name="status" id="delivered" onClick={()=>{setStatus("delivered")}}/>
        <label className='mx-2' htmlFor="delivered">Delivered</label>
        <br />
        <button onClick={()=>{
          if(status){
            dispatch(changeOrderStatus({orderId:individualOrder._id,status:status}))}}
          } 
          className='p-3 rounded-lg bg-gray-100 hover:bg-gray-200'>Change</button>
        </>:<></>}
        </>:<>
        <button onClick={()=>{setChangingStatus(true)}} className='p-2 my-2 rounded-lg bg-gray-100 hover:bg-gray-200'>Change Status</button>
        </>}
       
       </div>
      </>:<></>}
    
    </div>
  )
}

export default ManageOrder

// 