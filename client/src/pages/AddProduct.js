import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../redux/productSlice'

const AddProduct = () => {
  const dispatch=useDispatch()
    const [addingCategory,setAddingCategory]=useState(false)
    const [addingSubCategory,setAddingSubCategory]=useState(false)
    const {categories} = useSelector(state=>state.products)
    const [numberOfSpecificationFields,setNumberOfSpecificationFields]=useState(1)
    const [selectedCategory,setSelectedCategory]=useState(null)
    let specificationFields=[]
    for(let i=1;i<=numberOfSpecificationFields;i++){
        specificationFields.push(i)
    }
    useEffect(()=>{
    dispatch(fetchCategories())
    },[])
  return (
    // 
    <div className='mt-14'>
        <h1 className='text-xl font-bold'>ADD PRODUCT</h1>
      <form action='/api/products/add' method='post' encType='multipart/form-data' className='max-w-84 flex flex-col gap-2 p-3' >
      <input type="hidden" name="addingCategory" value={addingCategory} />
      <input type="hidden" name="addingSubCategory" value={addingSubCategory} />
        <input placeholder='Name' name='name' type="text" className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Name' name='productImages' type="file" multiple className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Available Stock' name='stock' type='number' inputMode='numeric' className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
{/* Add Category */}
        <div className="add-category flex gap-2 w-full">
        {addingCategory?<>
        <input placeholder='Enter Category' type="text" name="category" id="category" className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2'/>
        </>:<>  <select onClick={(e)=>{setSelectedCategory(e.target.value)}} name="category" id="category" className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' >
          <option value="select" >Category of Product</option>
          {categories?.map(category=>{
              return <option  value={category._id} >{category.name}</option>
          })}
          
      </select></>}
      <button className='p-2 bg-gray-100 rounded-lg' onClick={(e)=>{e.preventDefault();setAddingCategory(!addingCategory)}}>{addingCategory?<>Use Existing Sub-Category</>:<>Add New Category</>}</button>
        </div>
{/* Add SubCategory */}
        <div className="add-sub-categroy flex gap-2 w-full">
            {addingSubCategory?<>
                <input placeholder='Enter Sub-Category' type="text" name="subCategory" id="subCategory" className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2'/>
            </>:<>     <select name="subCategory" id="subCategory" className=' bg-gray-100 border-sky-100 border-2 rounded-lg p-2'>
            <option value="select">Sub-Category of Product</option>
            {categories?.filter(category=>{return category._id===selectedCategory}).map(category=>category.subCategories.map(subCategory=>{return <option value={subCategory._id}>{subCategory.name}</option>}))}
           
        </select></>}
   
        <button className='p-2 bg-gray-100 rounded-lg' onClick={(e)=>{e.preventDefault();setAddingSubCategory(!addingSubCategory)}}>{addingSubCategory?<>Use Existing Sub-Category</>:<>Add New Sub-Category</>}</button>

        </div>
        <input placeholder='Maximum Retail Price' type="number" name="mrp" id="" inputMode='numeric'  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Selling Price' type="number" name="sellingPrice" id="" inputMode='numeric'  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Delivery Charges' type="number" name="deliveryCharges" id="" inputMode='numeric'  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Delivery Days' type="number" inputMode='numeric' name="deliveryDays" id=""  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Warranty (XX Years XX Months)' type="text" name="warranty" id=""  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
        <input placeholder='Replacement Days' type="number" inputMode='numeric' name="replacementDays" id=""  className='bg-gray-100 border-sky-100 border-2 rounded-lg p-2' />
      
            {specificationFields.map(field=>{
                return(<>
                  <div key={field} className="product-specifications">
                <input placeholder='Specification' name='specificationName' type="text" className='w-fit bg-gray-100 sm:border-sky-200 sm:border-2 sm:rounded-lg p-1 sm:p-2'/> -- <input placeholder='Specification Detail' name='specification' type="text" className='sm:border-sky-200 sm:border-2 sm:rounded-lg p-1 sm:p-2'/> 
                </div>
                </>)
            })}
            <button className='border-sky-200 border-2 text-black rounded-lg p-2 hover:bg-sky-300 hover:text-white' onClick={(e)=>{e.preventDefault();setNumberOfSpecificationFields(numberOfSpecificationFields+1)}}>Add More Details</button>
            <textarea placeholder='Product Description' name="productDescription" id="" className='border-sky-200 border-2 text-black rounded-lg p-2'></textarea>
            <button className='border-sky-200 border-2 text-black rounded-lg p-2 hover:bg-sky-300 hover:text-white'>Upload</button>
      </form>
    </div>
  )
}

export default AddProduct
