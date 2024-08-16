import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import Review from '../components/Review';
import CustomerReviews from "../components/CustomerReviews"
import {useNavigate,useParams} from "react-router-dom";
import { fetchIndividualProduct } from '../redux/productSlice';
import { useDispatch,useSelector } from 'react-redux';
import { addBuyNow } from '../redux/productSlice';
import { setCurrentUser,setCart, addToCart } from '../redux/userSlice';
import { FaArrowRightLong } from "react-icons/fa6";

const IndividualProduct = () => {
  const navigate=useNavigate()
  const {product}=useParams()
  const dispatch=useDispatch()
  const {user,cart}=useSelector(state=>state.user)
  const individualProduct=useSelector(state=>state.products.individualProduct)
  const [bigImage,setBigImage]=useState()
  useEffect(()=>{
     dispatch(fetchIndividualProduct(product)) 
  },[])
  // 
  useEffect(()=>{
    const user= localStorage.getItem("user");
    const localCart= localStorage.getItem("cart");
    if(!user){
      // dispatch(fetchUser())
    }
    if(user){
      dispatch(setCurrentUser(user))
    }
    if(localCart){
      dispatch(setCart(localCart))
    }
},[])
useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart));
},[cart])
  useEffect(()=>{
    setBigImage(individualProduct?.images[0])
  },[individualProduct])
  const avgRating=Math.round(individualProduct?.totalRating/individualProduct?.numberOfReviews*10)/10
  let deliveryDate=new Date(Date.now()+((individualProduct?.deliveryDays)*24*3600000)).toDateString()
  const printableDate=deliveryDate.slice(0,deliveryDate.length-5)
  return (
    <div className="individual-product m-auto mt-14 p-2 max-w-6xl">
    <div className='md:grid grid-cols-2 '>
      <div className="left md:flex-row-reverse md:p-10">
      <div className="big-image-container w-88 ">
          <img className='mx-auto md:w-96' src={bigImage} alt="" defaultValue={individualProduct?.images[0]} />
        </div>
        <div className="small-images-container flex justify-center">
          {individualProduct?.images.map(img=>{
            return <img className='w-10 border-2 my-1' src={img} key={img}  alt="small" onMouseEnter={(e)=>{setBigImage(e.target.src)}} />
          })}
        </div>
      
      </div>
      <div className="right md:mt-10 md:h-96 md:overflow-y-scroll container" >
      <p className='font-light md:font-semibold text-lg md:text-2xl'>{individualProduct?.name}</p>
        <div className="rating flex items-center ">
          {(individualProduct?.numberOfReviews>0)?<p>{avgRating}</p>:<p>0</p>}
        <div className="stars flex text=[#FF9800]  m-1">
          {/* if(star>=1 to 5 fullStar coloured)else(if(between tow numbers <>half<>))else gray */}
          {avgRating>=1?<FaStar className='fill-[#FF9800]'/>:(0<(avgRating)&&(avgRating)<1)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=2?<FaStar className='fill-[#FF9800]'/>:(1<(avgRating)&&(avgRating)<2)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=3?<FaStar className='fill-[#FF9800]'/>:(2<(avgRating)&&(avgRating)<3)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=4?<FaStar className='fill-[#FF9800]'/>:(3<(avgRating)&&(avgRating)<4)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=5?<FaStar className='fill-[#FF9800]'/>:(4<(avgRating)&&(avgRating)<5)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
                  </div>
         <p className='m-1'>({individualProduct?.numberOfReviews})</p>
         </div>
         <hr />
         <div className="pricing flex items-center">
          <div className="selling-price flex text-2xl">
            <span><h2 className='font-semibold'>₹ {individualProduct?.sellingPrice}</h2></span>
          </div>
          <div className="text-xs md:text-base mrp mx-2">
            <p>MRP: <span className='line-through'>{individualProduct?.mrp}</span></p>
          </div>
         </div>
       {individualProduct?.stock>0?
        <div className=" text-sm md:text-base delivery flex gap-2 my-1 text-green-600 font-medium">
        <div className="delivery-cost ">
          {(individualProduct?.deliveryCharges===0)?<>Free delivery</>:<>Delivery expected on</>}
        </div>
        <div className="delivery-day">
          <p>{printableDate}</p>
        </div>
       </div>:
       <p>Out of Stock</p> 
      }
         <hr />
         {individualProduct?.stock>0?
        <p className='my-1 text-red-600'><span className='font-bold'>Available </span>{individualProduct?.stock} Only</p>:
        <></> 
        }
         
        {individualProduct?.stock?<> 
        <button onClick={()=>{dispatch(addToCart(individualProduct))}} className='w-full md:w-40 bg-[#ffd900] py-3 md:py-1 px-4 my-1 rounded-full align-bottom justify-center'>Add to cart</button>
         <br />
         <button className='w-full md:w-40 bg-[#FF9800] py-3 md:py-1 px-4 my-1 rounded-full align-bottom justify-center' onClick={()=>{dispatch(addBuyNow(individualProduct));navigate("/order-page")}}>Buy Now</button></>:
         <>
          <button className='w-full md:w-40 bg-[#ffd900] py-3 md:py-1 px-4 my-1 rounded-full align-bottom justify-center'>Add to cart</button>
         <br />
         <button className='w-full md:w-40 bg-[#FF9800] py-3 md:py-1 px-4 my-1 rounded-full align-bottom justify-center'>Buy Now</button>
         </>
         }
         
         <hr />
         <div className="specifications">
          <table className='w-full'>
            {individualProduct?.specificationName?.map((spec,index)=>{
              return(<tbody key={index}>
                <td className="left border-b-2 bg-gray-50 p-2">{individualProduct.specificationName[index]}</td>
                <td className='left border-b-2 p-2'>{individualProduct.specification[index]}</td>
              </tbody>)
            })}
          </table>
         </div>
        <p className='my-5'>{individualProduct?.productDescription}</p>
      </div>
    </div>
    <div className="reviews mt-10 grid grid-rows-2 md:grid-cols-2 h-fit items-top">
      <CustomerReviews totalRating={individualProduct?.totalRating} numberOfReviews={individualProduct?.numberOfReviews} reviews={individualProduct?.reviews}/>
      <div className="right">
            <h1 className='text-2xl my-2 font-bold'>Reviews</h1>
      <button className='bg-gray-100 border-2 p-2 rounded-lg flex items-center gap-3' onClick={()=>{navigate(`/write-review/${product}`)}}>Write A Review <FaArrowRightLong className='fill-gray-600'/></button>
            {individualProduct?.reviews?.map(review=>{
              return <Review review={review} user={user?._id}/>
            })}
      </div>
      </div>
    </div>
  )
}

export default IndividualProduct
