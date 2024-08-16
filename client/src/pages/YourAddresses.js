import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import { addAddress, fetchUser } from '../redux/userSlice';
import { IoArrowBackOutline } from "react-icons/io5";


const YourAddresses = () => {
  const dispatch = useDispatch()
  const [addingAddress,setAddingAddress]=useState()
  const [details,setDetails]=useState()
  const user=useSelector(state=>state.user.currentUser)
  const handleChange=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setDetails({...details,[name]:value});
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
      dispatch(addAddress(details));
      setAddingAddress(false)
  }
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  return (
    <div className='mt-14'>
      {addingAddress?<>
      <button className='font-semibold flex items-center gap-1 m-2 text-lg text-sky-400' onClick={(e)=>{e.preventDefault();setAddingAddress(false)}}><IoArrowBackOutline/>back</button>
      <h1 className='md:ml-5 text-gray-500 font-bold text-3xl'>Add Address</h1>
        <form action="" className='flex flex-col gap-2 md:p-5' onSubmit={(e)=>{handleSubmit(e)}}>
          <input required className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Name' name='name' type="text" />
          <input required className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Phone' name='phone' type="text" />
          <input required className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Address Line 1' name='addressLine1' type="text" />
          <input className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Aggress Line 2' name='addressLine2' type="text" />
          <input required className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='City' name='city' type="text" />
          <input className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Landmark' name='landmark' type="text" />
          <input required className='p-2 border-2 border-sky-100 rounded-xl' onChange={(e)=>{handleChange(e)}} placeholder='Pincode' name='pincode' type="number" inputMode='numeric' />
          <button type="submit" className="rounded-lg login-btn py-2 font-semibold bg-sky-400 hover:text-white disabled:bg-sky-300 text-white hover:bg-sky-500">Add Address</button>
        </form>
      </>:<div className='md:grid md:grid-cols-3 px-5'>
      <div onClick={()=>setAddingAddress(true)} className="my-10 mx-auto address-card aspect-square w-60 bg-gray-100 flex flex-col justify-center items-center border-dashed border-2 border-gray-300">
      <AiOutlinePlus className='size-24 fill-slate-300'/>
      <h1 className='text-2xl text-gray-500 font-bold'>Add address</h1>
      </div>
      {user?.addresses.map(address=>{
        return(      <div key={address._id} className="my-10 address-card aspect-square w-60 bg-gray-100 flex flex-col border-dashed border-2 border-gray-300 mx-auto p-2">
          <p>{address.name}</p>
          <p>{address.phone}</p>
          <p>{address.addressLine1}</p>
          <p>{address.naddressLine2}</p>
          <p>{address.city}</p>
          <p>{address.landmark}</p>
          <p>{address.pincode}</p>
        </div>)
      })}
      </div>}
    </div>
  )
}

export default YourAddresses

// 