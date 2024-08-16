import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import CartCard from '../components/CartCard'
import { setCurrentUser, setCart } from '../redux/userSlice'
import { addBuyNow } from '../redux/productSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {cart}=useSelector(state=>state.user)
  const {buyNow}=useSelector(state=>state.products)
  const [subTotal,setSubTotal]=useState(0)
  const [totalItems,setTotalItems]=useState(0)
  let total=0
  let totalQuantity=0
  useEffect(()=>{
    const user=localStorage.getItem("user");
    const localCart=localStorage.getItem("cart");
    if(user){
      dispatch(setCurrentUser(user))
    }
    if(cart){
      dispatch(setCart(localCart))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
    cart?.forEach(element => {
      total+=element.sellingPrice*element.quantity
      totalQuantity += element.quantity
    });
    setSubTotal(total)
    setTotalItems(totalQuantity)
  },[cart])
  useEffect(()=>{
    localStorage.setItem("buyNow",JSON.stringify(buyNow))
  },[buyNow])
  return (
    <div  className='mt-14 max-w-6xl mx-auto'>
      <div className="subtotal">
        {(cart?.length===0)?<>
          <p className='text-2xl py-2 ml-10'>Cart is Empty</p>
        </>:
        <><p className='text-2xl py-2 ml-10'>Subtotal <span className='font-bold'>₹{subTotal}</span></p>
        </>}
        
        <hr />
        <button className='w-full md:w-40 bg-[#FF9800] py-3 md:py-1 px-4 my-1 rounded-full align-bottom justify-center' onClick={()=>{dispatch(addBuyNow(cart));navigate("/order-page")}}>Buy Now</button>
      </div>
      {cart?.map((product,index)=>{
        return(<CartCard product={(product)} index={index}/>)
      })}
    </div>
  )
}
export default Cart
// 
