import React,{useEffect, useState} from 'react'
import { MdPerson } from "react-icons/md";
import { FaStar } from "react-icons/fa";


// 
const Review = ({user,review}) => {
  const [rating,setRating]=useState(0)
  useEffect(()=>{
    setRating(review.rating)
  },[])
  return (
    <div className='my-5' key={review._id}>
      <div className="reviewer-detail flex items-center">
        <div className="avatar">
        <MdPerson className='fill-gray-400 size-10 md:size-10 mr-2 border-2 border-gray-400 rounded-full' />
        </div>
        <p>{review.reviewBy}</p>
      </div>
      <div className="rating flex items-center">
        <FaStar   style={{fill:rating>=1?"#FF9800":"gray"}}/>
        <FaStar   style={{fill:rating>=2?"#FF9800":"gray"}}/>
        <FaStar   style={{fill:rating>=3?"#FF9800":"gray"}}/>
        <FaStar   style={{fill:rating>=4?"#FF9800":"gray"}}/>
        <FaStar   style={{fill:rating>=5?"#FF9800":"gray"}}/>
        <p className='ml-2 font-bold '>{review.reviewHeading}</p>
      </div>
      <p className='text-red-500 font-bold text-xs'>Verified Purchase</p>
      <p className='pb-5 text-sm md:text-base'>
        {review.reviewDescription}
        </p>
        <div className="images flex gap-2 ">
          {review.reviewImages.map(img=>{
            return <div style={{backgroundImage:`url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:`cover`,backgroundPosition:"center"}} className='w-40 aspect-square mb-5'></div>
          })}
        </div>
        <button className='px-6 mb-6 py-1 border-2 rounded-full border-gray-300 text-gray-700'>Helpful</button> 
        <button className='text-gray-400 pl-5'>Report</button>
        {(review.reviewById===user)?<button className='text-gray-400 pl-5'>Delete Review</button>:<></>}
    <hr />
    </div>
  )
}
export default Review