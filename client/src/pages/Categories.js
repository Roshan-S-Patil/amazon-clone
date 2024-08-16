import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsOfCategory, fetchProductsOfSubCategory } from '../redux/productSlice'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const Categories = () => {
    const {category}=useParams()
    const dispatch=useDispatch()
    const {categoryWiseProducts,productsLoading}=useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(fetchProductsOfCategory(category))
    },[])
  return (
    <div className='mt-14'>
      {productsLoading?<div className='text-2xl font-bold w-screen h-screen grid place-content-center' ><h1>Loading Products...</h1></div>:<></>}
      {categoryWiseProducts?<>
      {categoryWiseProducts.map(product=>{
        return <ProductCard product={product}/>
      })}
      </>:<></>}
    </div>
  )
}

export default Categories

// 