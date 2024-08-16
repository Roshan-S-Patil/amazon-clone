import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { MdOutlineDelete } from "react-icons/md";
import { addProductQuantity, deleteFromCart, removeProductQuantity } from '../redux/userSlice';

const CartCard = ({product,index}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const date=new Date(Date.now()+(product?.deliveryDays)*24*3600000).toDateString()
    const deliveryDate=date.slice(0,date.length-5)
  return (
    // 
    <div className='p-2 mt-14 flex gap-2 sm:gap-10' key={product._id}>
       <div className="prod-image-container w-fit">
      <img onClick={()=>{navigate(`/individual-product/${product._id}`)}} className='w-36 sm:w-60' src={product.images[0]} alt="oneplus" />
      </div>
      <div className="prod-details flex-col">
        <div onClick={()=>{navigate(`/individual-product/${product._id}`)}}>
        <p className='font-semibold text-base sm:text-2xl'>{product.name}</p>
        <div className="rating flex items-center">
          <p className='sm:m-1 text-xs sm:text-base'>4.5</p>
        <div className="stars flex  m-1">
        <FaStar className='size-3 md:size-4 fill-[#FF9800]'/>
        <FaStar  className='size-3 md:size-4 fill-[#FF9800]'/>
        <FaStar  className='size-3 md:size-4 fill-[#FF9800]'/>
        <FaStar  className='size-3 md:size-4 fill-[#FF9800]'/>
         <FaStarHalfAlt  className='size-3 md:size-4 fill-[#FF9800]'/>
         </div>
         <p className='m-1 text-xs sm:text-base'>(231)</p>
         </div>
         <div className="pricing flex items-center">
          <div className="selling-price flex text-lg sm:text-2xl">
            {/* <sup className='top-[0.6em]'>₹</sup>  */}
            <span><h2 className='font-medium md:font-semibold'>₹ {product.sellingPrice}</h2></span>
          </div>
          <div className="mrp mx-2 text-xs sm:text-base">
            <p className=''>MRP: <span className='line-through '>{product.mrp}</span></p>
          </div>
         </div>
         <div className="delivery flex gap-2 sm:my-1 text-xs sm:text-base text-green-600 font-semibold">
          <div className="delivery-cost ">
            {(product.deliveryCharges===0)?<>Free delivery</>:<>Expected Delivery on</>}
          </div>
          <div className="delivery-day">
            {deliveryDate}
          </div>
         </div>
         </div>
         <div className="buttons flex flex-col sm:flex-row sm:gap-4">
         <button onClick={()=>{dispatch(deleteFromCart(index))}} className='bg-gray-200 py-1 px-4 my-1 rounded-full align-bottom text-sm md:text-base'>Remove</button>
         <div className="quantity flex items-center gap-2">
            <button className='bg-gray-200 font-bold px-2 border-2' onClick={()=>{if(product.quantity>1){dispatch(removeProductQuantity(index))};if(product.quantity===1){dispatch(deleteFromCart(index))}}}>{product.quantity===1?<><MdOutlineDelete className='my-1'/></>:<>-</>}</button> <p className='bg-white px-2 border-2'>{product.quantity}</p> <button className='bg-gray-200 font-bold px-2 border-2' onClick={()=>{dispatch(addProductQuantity(index))}}>+</button>
         </div>
         </div>
         <p className='sm:my-1 text-xs sm:text-base'><span className='font-bold'>EMI</span> starts at ₹1,939</p>
      </div>
    </div>
  )
}

export default CartCard