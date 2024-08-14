import React, { useState } from "react";
import { MdPerson } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { VscReferences } from "react-icons/vsc";
import { login,signup } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const LoginAndSignup = () => {
  const dispatch=useDispatch()
  const [details, setDetails] = useState({});
  const [signedup, setSignedup] = useState(true);
  const loginButton=document.querySelector(".login-btn")
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const confirmPassword = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      if (e.target.value !== details.password) {
        e.target.classList.add("invalid-field")
        e.target.classList.remove("focus:border-sky-500")
        e.target.classList.remove("focus:ring-sky-500")
        loginButton.disabled=true
      } else {
        e.target.classList.remove("invalid-field")
        e.target.classList.add("focus:border-sky-500")
        e.target.classList.add("focus:ring-sky-500")
        loginButton.disabled=false
      }
    } else {
      e.target.classList.remove("invalid-field")
      e.target.classList.add("focus:border-sky-500")
      e.target.classList.add("focus:ring-sky-500")
    }
  };

  return (
    <div className="h-screen w-screen flex p-3">
      <div className="login-form-container m-auto w-full md:max-w-xl">
        <h1 className=" text-center text-4xl p-2 font-bold">Clone</h1>
        {signedup?<>
         <form onSubmit={(e)=>{e.preventDefault();dispatch(login(details));}} className="flex flex-col gap-1">
         
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MdOutlineEmail className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="invalid:ring-red-600 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e)=>handleInputChange(e)}
              required
            />
          </label>
        
            
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaLock className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e)=>handleInputChange(e)}
            />
          </label>
        
        
          <button type="submit" className="rounded-lg login-btn py-2 font-semibold bg-sky-400 hover:text-white disabled:bg-sky-300 text-white hover:bg-sky-500">Login</button>
   
          <p>
            Don't have an account?{" "}
            <span className=" text-cyan-800 hover:cursor-pointer" onClick={()=>setSignedup(!signedup)}>Signup</span>
          </p>
        </form>
        </>:<>
        <form action="" onSubmit={(e)=>{e.preventDefault();dispatch(signup(details));}} className="flex flex-col gap-1">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MdPerson className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Name"
              type="text"
              name="name"
              onChange={(e)=>handleInputChange(e)}
            />
          </label>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MdOutlineEmail className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="invalid:ring-red-600 placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e)=>handleInputChange(e)}
              required
            />
          </label>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaMobileAlt className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Phone"
              type="number"
              name="phone"
              onChange={(e)=>handleInputChange(e)}
            />
          </label>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaLock className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e)=>handleInputChange(e)}
            />
          </label>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <FaLock className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Confirm Parssword"
              type="password"
              name="confirmPassword"
              onChange={(e)=>{handleInputChange(e);confirmPassword(e)}}
            />
          </label>
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <VscReferences className="fill-slate-400 " />
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Referral Code"
              type="text"
              name="referralCode"
              onChange={(e)=>handleInputChange(e)}
            />
          </label>

          <button type="submit" className="rounded-lg login-btn py-2 font-semibold bg-sky-400 hover:text-white disabled:bg-sky-300 text-white hover:bg-sky-500">Signup</button>
   
          <p>
            Already have an account?{" "}
            <span className=" text-cyan-800 cursor-pointer" onClick={(e)=>{setSignedup(!signedup)}}>Login</span>
          </p>
        </form></>}
       
      </div>
     
    </div>
  );
};

export default LoginAndSignup;
