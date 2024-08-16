import React, { useEffect, useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux";
import { createOrder, fetchUser} from "../redux/userSlice";
import { addBuyNow } from "../redux/productSlice";

const Order = () => {
  const navigate=useNavigate()
  const [modeOfPayment,setModeOfPayment]=useState("prepaid")
  const user=useSelector(state=>state.user.currentUser)
  const dispatch=useDispatch()
  const [address,setAddress]=useState()
  const buyNow=useSelector(state=>state.products.buyNow)
  let items=0;
  let delivery=0;
  let total=0;
  let promo=0;
  let orderTotal=0;
  let deliveryDays=0;
  let deliveryDate=null;
  useEffect(()=>{
    dispatch(fetchUser())
    const localOrder=JSON.parse(localStorage.getItem("buyNow"))
    if(localOrder){
      dispatch(addBuyNow(localOrder))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("buyNow",JSON.stringify(buyNow))
  },[buyNow])
  useEffect(()=>{
    if(user){
      setAddress(user.addresses[0])
    }
  },[user])
  if(buyNow instanceof Array){
    buyNow?.forEach(product=>{
      items+=product.sellingPrice*product.quantity;
      delivery+=product.deliveryCharges*product.quantity;
      total=items+delivery;
      
      if(deliveryDays<product.deliveryDays){
        deliveryDays=product.deliveryDays
      }
    })
    promo=parseInt(total*0.05);
      orderTotal=total-promo;
    const date=new Date(Date.now()+(deliveryDays*24*3600000))?.toDateString()
    deliveryDate=date?.slice(0,date.length-5)
  }else{
    items=buyNow?.sellingPrice;
    delivery=buyNow?.deliveryCharges;
    total=(buyNow?.sellingPrice)+(buyNow?.deliveryCharges);
    promo=parseInt(total*0.05);
    orderTotal=total-promo;
    deliveryDays=buyNow?.deliveryDays;
    const date=new Date(Date.now()+(deliveryDays*24*3600000))?.toDateString()
    deliveryDate=date.slice(0,date.length-5)
  }
  const handlePrepaidOrder=async(e)=>{
    e.preventDefault()
    // Creating Razorpay Order
    const razorpayOrder=await axios.post("/checkout/order",{amount:orderTotal,currency:"INR"})
    // Creating Order for our backend
    dispatch(createOrder({order:buyNow,address,deliveryDate:deliveryDate,razorpayOrderId:razorpayOrder.data.id,paymentMode:modeOfPayment}));
    var options = {
    key: "rzp_test_b1zV3q2zX9W250", // Enter the Key ID generated from the Dashboard
    amount: razorpayOrder.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Roshan Patil", //your business name
    description: "Testing...",
    image: "https://res.cloudinary.com/dwievnals/image/upload/c_crop,g_auto,h_800,w_800/sthjbjdpeu7gzoglt8am.",
    order_id: razorpayOrder.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `/checkout/payment-verification?order=${JSON.stringify(razorpayOrder.data)}&product_id=${buyNow._id}`,
    redirect:false,
    prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: user.name, //your customer's name
        email: user.email,
        contact: user.phone //Provide the customer's phone number for better conversion rates 
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        color: "#3399cc"
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown); 
  }
};

    try {
      var rzp1 =await new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
    }
  }
  const handleCodOrder=(e)=>{
    e.preventDefault()
    dispatch(createOrder({order:buyNow,address,deliveryDate:deliveryDate,paymentMode:modeOfPayment}))
    navigate("/profile/your-orders")
  }
  return (
    <div className="order-page w-fit mx-auto mt-14 p-5">
      <div className="delivery-address felx-col gap-5 sm:flex sm:gap-16 border-2 border-gray-100 rounded-xl p-3">
        <p className="text-2xl font-bold">Delivery Address</p>
        <div className="address">
          <p>{address?.name}</p>
          <p>{address?.addressLine1}</p>
          <p>{address?.addressLine2}</p>
          <p>{address?.city}, {address?.pincode}</p>
        </div>
        <p onClick={()=>{setAddress(null)}} className="text-sky-700 hover:cursor-pointer">change</p>
      </div>
      <div className="order-summary w-full border-2 rounded-xl border-gray-100 sm:w-full mx-auto p-5 mt-5">
        <p className="text-2xl font-bold">Order Summary</p>
        <div className="details flex justify-between mt-3">
          <div className="left ">
            <p>Items :</p>
            <p>Delivery :</p>
            <p>Total :</p>
            <p>Promotions Applied :</p>
            <hr />
            <p className="font-semibold text-xl text-red-600">Order Total :</p>
          </div>
          <div className="right flex flex-col items-end">
            <p>₹{(items)?.toLocaleString('en-In')}</p>
            <p>₹{(delivery)?.toLocaleString('en-IN')}</p>
            <p>₹{(total)?.toLocaleString('en-IN')}</p>
            <p>₹{(promo)?.toLocaleString('en-IN')}</p>
            <hr className="w-full" />
            <p className="font-semibold text-xl text-red-600">₹{(orderTotal).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
      {(buyNow instanceof Array)?<> 
       {/* PRODUCT CARD */}
       <div className="review-order">
       <h3 className="m-4 font-bold text-2xl">Products</h3>
      { buyNow?.map(product=>{
        return( <div className="prod w-full mt-14 flex  gap-4 bg-gray-50">
            <div className="prod-image-container w-fit">
              <img
                className="w-40"
                src={product.images[0]}
                alt={product.name}
              />
            </div>
            <div className="prod-details flex-col pt-2 mx-2">
              <p className="font-semibold text-lg">
                {product.name}
              </p>
              <div className="pricing">
                <div className="selling-price flex items-center gap-3">
                    <h2 className="font-medium text-xl">₹{(product.sellingPrice).toLocaleString('en-IN')}</h2>
                    <p className="font-semibold">(Qty-{product.quantity})</p>
                </div>
             
        
            </div>
            <div className="delivery my-1 text-sm">
                <div className="delivery-cost text-green-600 font-semibold">{(product.deliveryCharges===0)?<>Free Delivery</>:<>Delivery charges ₹{product.deliveryCharges}</>}</div>
                <div className="delivery-day text-green-600 font-semibold">{deliveryDate}</div>
              </div>
              </div>
          </div>)
       })}
       
       
      </div></>:<>
       {/* PRODUCT CARD */}
   {   buyNow?<><div className="review-order">
        <div className="prod w-40 mt-14  flex-col gap-4 bg-gray-50">
        <h3 className="m-4 font-bold text-2xl">Products</h3>
          <div className="prod-image-container w-fit">
            <img
              className="w-60"
              src={buyNow?.images[0]}
              alt="oneplus"
            />
          </div>
          <div className="prod-details flex-col mx-2">
            <p className="font-semibold text-l">
              {buyNow?.name}
            </p>
            <div className="pricing">
              <div className="selling-price flex text-xl">
                  <h2 className="font-medium">₹{(buyNow?.sellingPrice).toLocaleString('en-IN')}</h2>
              </div>
            </div>
      
          </div>
          <div className="delivery my-1 mx-2 text-sm">
              <div className="delivery-cost text-green-600 font-semibold">{(buyNow?.deliveryCharges===0)?<>Free Delivery</>:<>Delivery charges ₹{buyNow?.deliveryCharges}</>}</div>
              <div className="delivery-day text-green-600 font-semibold">{deliveryDate}</div>
            </div>
        </div></div></>:<></> }
      
      </>}
      {/* PAYMENT METHODS */}
        <h1 className="m-4 font-bold text-2xl">Mode of Payment</h1>
      <input onClick={()=>{setModeOfPayment("prepaid")}} defaultChecked type="radio" name="paymentMode" id="prepaid" value="prepaid" className="mx-2"/>
      <label htmlFor="cod" className="mx-2">Pay Online</label> <br />
      <input onClick={()=>{setModeOfPayment("cod")}}  type="radio" name="paymentMode" id="cod" value="cod" className="mx-2"/>
      <label htmlFor="cod" className="mx-2">Cash On Delivery (COD)</label>
      {user?.addresses.length===0?<button onClick={()=>{navigate("/profile/addresses")}} className=" place-order-btn w-full  bg-[#ffd900] py-3 sm:py-2 px-4 my-3 rounded-full align-bottom justify-center">Add Address</button>:
         <button onClick={(e)=>{if(modeOfPayment==="prepaid"){
          handlePrepaidOrder(e)
        }else{
          handleCodOrder(e)
        }}} className=" place-order-btn w-full  bg-[#ffd900] py-3 sm:py-2 px-4 my-3 rounded-full align-bottom justify-center">
        Place Order
      </button>
      }
        {/* PLACE ORDER BUTTON */}
     
    </div>
  );
};
export default Order;

// 