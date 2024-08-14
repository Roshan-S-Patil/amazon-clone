import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderManagement = () => {
    const{orderId}=useParams()
    const [order,setOrder]=useState()
    useEffect(()=>{
        const getOrder=async()=>{
            const order=await axios.get(`/order/individual-order?_id=${orderId}`)
            setOrder(order.data)
        }
        getOrder()
    },[])
    console.log(order)
  return (
    <div>
      
    </div>
  )
}

export default OrderManagement
