import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateStock } from "../redux/AdminSlice";
const ProductStrip = ({ product }) => {
const dispatch=useDispatch()
const [stock,setStock]=useState()
  const navigate = useNavigate();
  const [addingStock, setAddingStock] = useState();
  return (
    <div>
      <div className="grid grid-cols-7 gap-3 p-3 border-b-2">
        <div className="overflow-hidden">
          <p className="flex items-center gap-2"
            onClick={() => {
              navigate(`/individual-product/${product._id}`);
            }}
          >
            {product._id}
          </p>
        </div>
        <p className="flex items-center gap-2">{product.name}</p>
        <p className="flex items-center gap-2">{product.category.name}</p>
        <p className="flex items-center gap-2">{product.subCategory.name}</p>
        <p className="flex items-center gap-2"><FaStar className='fill-[#FF9800]'/>{Math.round(product?.totalRating/product?.numberOfReviews*10)/10}</p>
        {addingStock ? (
          <input
            type="number"
            min={0}
            inputMode="numeric"
            name="stock"
            className="self-center"
            placeholder="Enter Stock available"
            onChange={(e)=>{setStock(e.target.value)}}
          />
        ) : (
          <p className="flex items-center gap-2">{product.stock}</p>
          
        )}
        {addingStock ? (
            <FaCheck
              className="fill-green-600 self-center"
              onClick={() => {
                const _id=product._id
                dispatch(updateStock({_id,stock}))
                setAddingStock(!addingStock);
              }}
            />
           
      
        ) : (
          <p
            className="self-center hover:cursor-pointer hover:bg-gray-300 bg-gray-200 w-fit h-fit p-2 rounded-lg"
            onClick={() => {
              setAddingStock(!addingStock);
            }}
          >
            Add Stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductStrip;

// 