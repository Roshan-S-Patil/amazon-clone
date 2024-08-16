import React, { useEffect } from 'react'
import { fetchUser } from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'

const OrderCompletion = () => {
    const dispatch=useDispatch()
    const user=useSelector(state=>state.user.currentUser)
    useEffect(()=>{
        dispatch(fetchUser())
    },[])
  return (
    <div className=''>
      <h1 className='mt-14 text-4xl font-bold'>Order Completion</h1>
    {user?.orders[user.orders.length-1].amount}
    </div>
  )
}

export default OrderCompletion

// 