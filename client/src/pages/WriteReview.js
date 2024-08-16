import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../redux/userSlice';

const WriteReview = () => {
  const dispatch=useDispatch()
    const [rating,setRating]=useState(0);
    const {reviewOfProduct}=useParams()
    const user=useSelector(state=>state.user.currentUser)
    const reviewBy=user?.name
    const reviewById=user?._id
    useEffect(()=>{
      dispatch(fetchUser())
    },[])
  return (
    <div className='p-2 md:p-5 mt-14'>
        <div className="rating">
      <h1 className='text-2xl my-3'>Rating</h1>
      <div className="stars flex gap-3">
        <FaStar onClick={()=>{setRating(1)}} style={{fill:rating>=1?"#FF9800":"gray"}} className='scale-150'/>
        <FaStar onClick={()=>{setRating(2)}} style={{fill:rating>=2?"#FF9800":"gray"}} className='scale-150'/>
        <FaStar onClick={()=>{setRating(3)}} style={{fill:rating>=3?"#FF9800":"gray"}} className='scale-150'/>
        <FaStar onClick={()=>{setRating(4)}} style={{fill:rating>=4?"#FF9800":"gray"}} className='scale-150'/>
        <FaStar onClick={()=>{setRating(5)}} style={{fill:rating>=5?"#FF9800":"gray"}} className='scale-150'/>
         </div>
        </div>
        <form action='/review/add' method='post' encType='multipart/form-data' className='flex flex-col my-3'>
        <input type="hidden" name="rating" value={rating} />
        <input type="hidden" name="reviewOfProduct" value={reviewOfProduct} />
        <input type="hidden" name="reviewBy" value={reviewBy} />
        <input type="hidden" name="reviewById" value={reviewById} />
    <input className='p-2 border-2 rounded-lg my-3' type="text" placeholder='Review Heading' name='reviewHeading' />
    <textarea className='p-2 border-2 rounded-lg my-3' placeholder='Description' name='reviewDescription' />
    <input className='p-2 border-2 rounded-lg my-3' type="file" name="reviewImages" id="reviewImages" multiple />
    <button type="submit" className='border-2 w-fit p-2 rounded-lg hover:bg-[#FF9800] hover:text-white'>Submit</button>
    </form>
    </div>
  )
}

export default WriteReview
// fill-[#FF9800]
// 