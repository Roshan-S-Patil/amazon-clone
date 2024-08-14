import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CancelledProduct = ({product}) => {
    const navigate=useNavigate()
    const [refundStatus,setRefundStatus]=useState(null)
    const checkRefundStatus=async(redundId)=>{
        const response=await axios.get(`/order/get-refund-status?refundId=${redundId}`)
        setRefundStatus(response.data.status)
    }
  return (
   
        <div className=" my-3">
                      <div className="top rounded-lg grid grid-cols-3 p-3 bg-gray-100 text-sm sm:text-base overflow-hidden">
                        <div className="left">
                          <p>Requested On</p>
                          <p>{product.createdAt.slice(0,10)}</p>
                        </div>
                        <div className="middle">
                          <p>Amount</p>
                          <p>{product.amount}</p>
                        </div>
                        <div className="right">
                          <p>Order Id</p>
                          <p>{product.orderId}</p>
                        </div>
                      </div>
                      <div className="bottom p-3  ">
                              <div className="card grid grid-cols-2 my-2">
                                <div className="left flex gap-4">
                                  <img
                                    src={product.product.images[0]}
                                    alt={product.product.name}
                                    className="h-20 w-20"
                                  />
                                  <div className="details overflow-hidden text-sm sm:text-base">
                                    <p className='hover:cursor-pointer text-nowrap text-sky-600' onClick={()=>{navigate(`/individual-product/${product._id}`)}}>{product.product.name}</p>
                                    <p>Qty - {product.quantity}</p>  
                                  </div>
                                </div>
                                <div className="right text-right flex flex-col items-end gap-2">
                                <p onClick={()=>{checkRefundStatus(product.refundId)}}className="hover:cursor-pointer p-1 bg-gray-100 text-sm sm:text-base ">Refund Status</p>
                                {refundStatus?<>
                                {refundStatus==="processed"?<p className='bg-green-200 text-green-600 px-2 rounded-full text-sm sm:text-base'>Successful</p>:<></>}
                                {refundStatus==="pending"?<p className='bg-yellow-200 text-yellow-600 px-2 rounded-full text-sm sm:text-base'>Pending</p>:<></>}
                                {refundStatus==="failed"?<p className='bg-yellow-200 text-yellow-600 px-2 rounded-full text-sm sm:text-base'>Failed</p>:<></>}
                                </>:<></>}
                                </div>
                              </div>
                           
                        </div>
                    </div>
   
  )
}

export default CancelledProduct
