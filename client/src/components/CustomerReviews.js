import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const CustomerReviews = ({ numberOfReviews, totalRating, reviews }) => {
  const avgRating = Math.round((totalRating / numberOfReviews) * 10) / 10;
  let star5 = 0;
  let star5Percentage=0;
  let star4 = 0;
  let star4Percentage=0;
  let star3 = 0;
  let star3Percentage=0;
  let star2 = 0;
  let star2Percentage=0;
  let star1 = 0;
  let star1Percentage=0;
  reviews?.forEach((review) => {
    if (review.rating === 5) {
      star5++;
      star5Percentage=Math.round((star5/numberOfReviews)*100);
    }
    if (review.rating === 4) {
      star4++;
      star4Percentage=Math.round((star4/numberOfReviews)*100);
    }
    if (review.rating === 3) {
      star3++;
      star3Percentage=Math.round((star3/numberOfReviews)*100);
    }
    if (review.rating === 2) {
      star2++;
      star2Percentage=Math.round((star2/numberOfReviews)*100);
    }
    if (review.rating === 1) {
      star1++;
      star1Percentage=Math.round((star1/numberOfReviews)*100);
    }
  });

  return (
    <div className="m-1 h-fit">
      <h1 className="text-2xl font-extrabold">Customer Reviews</h1>
      <div className="stars flex text=[#FF9800]  items-center">
          {avgRating>=1?<FaStar className='fill-[#FF9800]'/>:(0<(avgRating)&&(avgRating)<1)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=2?<FaStar className='fill-[#FF9800]'/>:(1<(avgRating)&&(avgRating)<2)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=3?<FaStar className='fill-[#FF9800]'/>:(2<(avgRating)&&(avgRating)<3)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=4?<FaStar className='fill-[#FF9800]'/>:(3<(avgRating)&&(avgRating)<4)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {avgRating>=5?<FaStar className='fill-[#FF9800]'/>:(4<(avgRating)&&(avgRating)<5)?<FaStarHalfAlt className='fill-[#FF9800]'/>:<FaStar className='fill-gray-300'/>}
          {numberOfReviews>0?<p className="ml-2">{avgRating} out of 5</p>:<p className="ml-2">0 out of 5</p>}
      </div>
      <p>{numberOfReviews} global ratings</p>
      <div className="rating-graph flex flex-col gap-2 mt-2">
        <div className="5-star flex items-center text-sky-600 ">
          <p>5 star</p>
          <div
            style={{}}
            className="w-60 bg-gray-100 h-5 mx-2 relative overflow-hidden "
          >
            <div  style={{transform:`translateX(-${100-star5Percentage}%)`}} className="inner absolute bg-[#FF9800] z-10 w-60 h-5 "></div>
          </div>
          <p>{star5Percentage}%</p>
        </div>
        <div className="4-star flex items-center text-sky-600">
          <p>4 star</p>
          <div
            style={{}}
            className="w-60 bg-gray-100 h-5 mx-2 relative overflow-hidden   "
          >
            <div  style={{transform:`translateX(-${100-star4Percentage}%)`}} className="inner absolute bg-[#FF9800] z-10 w-60 h-5"></div>
          </div>
          <p>{star4Percentage}%</p>
        </div>
        <div className="3-star flex items-center text-sky-600">
          <p>3 star</p>
          <div
            style={{}}
            className="w-60 bg-gray-100 h-5 mx-2 relative overflow-hidden   "
          >
            <div  style={{transform:`translateX(-${100-star3Percentage}%)`}} className="inner absolute bg-[#FF9800] z-10 w-60 h-5"></div>
          </div>
          <p>{star3Percentage}%</p>
        </div>
        <div className="2-star flex items-center text-sky-600">
          <p>2 star</p>
          <div className="w-60 bg-gray-100 h-5 mx-2 relative overflow-hidden   ">
            <div style={{transform:`translateX(-${100-star2Percentage}%)`}}  className="inner absolute bg-[#FF9800] z-10 w-60 h-5"></div>
          </div>
          <p>{star2Percentage}%</p>
        </div>
        <div className="1-star flex items-center text-sky-600">
          <p>1 star</p>
          <div className="w-60 bg-gray-100 h-5 mx-2 relative overflow-hidden  ">
            <div  style={{transform:`translateX(-${100-star1Percentage}%)`}} className="inner absolute bg-[#FF9800] z-10 w-60 h-5 "></div>
          </div>
          <p>{star1Percentage}%</p>
        </div>
      </div>
    </div>
  );
};
export default CustomerReviews;
