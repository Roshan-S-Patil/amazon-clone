
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const ProductCardVertical = ({product}) => {
  const avgRating=(Math.round(product?.totalRating/product?.numberOfReviews*10)/10)
  return (
    <div className='sm:w-60 w-40  flex-col gap-4 bg-gray-50' key={product._id}>
    <div className="prod-image-container sm:w-60 sm:h-60 w-40 h-40 " >
    <img className='w-con' src={product?.images[0]} alt="oneplus" />
    </div>
    <div className="prod-details flex-col mx-1">
      <p className='font-semibold text-sm sm:text-base'>{product?.name}</p>
      <div className="rating flex items-center">
        {product?.numberOfReviews>0?<p className='m-1'>{avgRating}</p>:<p className='m-1'>0</p>}
      <div className="stars flex text=[#FF9800] m-1">
          {avgRating>=1?<FaStar className='fill-[#FF9800]'/>:(0<(avgRating)&&(avgRating)<1)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=2?<FaStar className='fill-[#FF9800]'/>:(1<(avgRating)&&(avgRating)<2)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=3?<FaStar className='fill-[#FF9800]'/>:(2<(avgRating)&&(avgRating)<3)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=4?<FaStar className='fill-[#FF9800]'/>:(3<(avgRating)&&(avgRating)<4)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=5?<FaStar className='fill-[#FF9800]'/>:(4<(avgRating)&&(avgRating)<5)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
       </div>
       <p className='m-1'>({product?.numberOfReviews})</p>
       </div>
       <div className="pricing ">
        <div className="selling-price flex text-lg sm:text-xl"> 
          <span><h2 className='font-medium'>₹{product?.sellingPrice}</h2></span>
        </div>
        <div className="mrp">
        <p className='text-sm'>MRP: <span className='line-through'>{product?.mrp}</span></p>
        </div>
       </div>
       {product.stock>0?
         <div className="delivery my-1 text-sm text-green-600 font-medium">
         <div className="delivery-cost">
           Free delivery
         </div>
         <div className="delivery-day">
           Sun, 21 jul
         </div>
        </div>
        :<><p>Out of Stock</p></>}
     
       <p className='my-1'><span className='font-bold'>EMI</span> starts at ₹1,939</p>
    </div>
    
  </div>
  )
}

export default ProductCardVertical
