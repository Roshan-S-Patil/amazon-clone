import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addToCart,addProductQuantity } from '../redux/userSlice';


const ProductCard = ({product}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const cart=useSelector(state=>state.user.cart)
  const addProductToCart=(e,product)=>{
    e.preventDefault();
    // CHECKING PRODUCT IN CART
      for(let i=0;i<cart.length;i++){
          if(cart[i]._id===product.id){
            dispatch(addProductQuantity(i))
            return;
          }
      }
  }
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])
  const avgRating=Math.round(product.totalRating/product.numberOfReviews*10)/10
  return (
    <div className='flex gap-4 bg-gray-50 items-center p-1 my-5' key={product._id}>
      <div className="prod-image-container w-fit">
      <img onClick={()=>{navigate(`/individual-product/${product._id}`)}} className='w-36 sm:w-60' src={product.images[0]} alt="oneplus" />
      </div>
      <div className="prod-details flex-col">
        <div onClick={()=>{navigate(`/individual-product/${product._id}`)}}>
        <p className='font-semibold text-base sm:text-2xl hover:cursor-pointer'>{product.name}</p>
        <div className="rating flex items-center">
          {product.numberOfReviews>0?<p className='sm:m-1 text-xs sm:text-base'>{avgRating}</p>:<p className='sm:m-1 text-xs sm:text-base'>0</p>}
        <div className="stars flex  m-1">
        {avgRating>=1?<FaStar className='fill-[#FF9800]'/>:(0<(avgRating)&&(avgRating)<1)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=2?<FaStar className='fill-[#FF9800]'/>:(1<(avgRating)&&(avgRating)<2)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=3?<FaStar className='fill-[#FF9800]'/>:(2<(avgRating)&&(avgRating)<3)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=4?<FaStar className='fill-[#FF9800]'/>:(3<(avgRating)&&(avgRating)<4)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=5?<FaStar className='fill-[#FF9800]'/>:(4<(avgRating)&&(avgRating)<5)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
         </div>
         <p className='m-1 text-xs sm:text-base'>({product.numberOfReviews})</p>
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
        {product.stock>0?
         <div className="delivery flex gap-2 sm:my-1 text-xs sm:text-base  text-green-600 font-semibold">
         <div className="delivery-cost">
           {(product.deliveryCharges===0)?<>Free delivery</>:<>Expected Delivery on</>}
         </div>
         <div className="delivery-day">
           {new Date(Date.now()+(product.deliveryDays*24*3600000)).toDateString().slice(0,10)}
         </div>
        </div>:
        <p>Out of Stock</p>
        }
         </div>
         {product.stock>0?<button onClick={(e)=>{dispatch(addToCart(product));addProductToCart(e,product)}} className='bg-[#ffd900] py-1 px-4 my-1 rounded-full align-bottom text-sm md:text-base'>Add to cart</button>:
         <button  className='bg-[#ffd900] py-1 px-4 my-1 rounded-full align-bottom text-sm md:text-base'>Add to cart</button>
         }
         <p className='sm:my-1 text-xs sm:text-base'><span className='font-bold'>EMI</span> starts at ₹1,939</p>
      </div>
      
    </div>
  )
}

export default ProductCard
