import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ExploreCategories = ({category}) => {
    const navigate=useNavigate()
    const [products,setProducts]=useState(null)
    const [productsLoading,setProductsLoading]=useState(false)
    useEffect(()=>{
        setProductsLoading(true)
        async function getProduct(){
        const products=await axios.get(`/products/explore-categories?category=${category._id}`)
        setProducts(products.data)
        setProductsLoading(false)
    }
    getProduct()
    },[])
  return (
    <div className='' key={category._id}>
      {productsLoading?<></>:<>
      <div onClick={()=>{navigate(`/category/${category._id}`)}} className="heading flex items-center">
      <h1 className='mx-5 text-lg font-semibold'>{category.name.toUpperCase()}</h1> <FaArrowRight /></div>
      <div className='grid grid-cols-2 grid-rows-2 w-80 mx-auto sm:mx-5 bg-gray-50 gap-3' >
      {products?.map(product=>{
        return <div key={product._id}>
            <img onClick={()=>{navigate(`/individual-product/${product._id}`)}} className='w-40 p-2 aspect-square' src={product.images[0]} alt="" />
            <p onClick={()=>{navigate(`/individual-product/${product._id}`)}} className='text-sm px-2 text-nowrap overflow-hidden'>{product.name.slice(0,15)}...</p>
            <p className='text-red-600 font-semibold px-2'>{Math.round((product.mrp-product.sellingPrice)/product.mrp*100*100)/100}% off</p>
        </div>
      })}</div>
      </>
      }
    </div>
  )
}

export default ExploreCategories
