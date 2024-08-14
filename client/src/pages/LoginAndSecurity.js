import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails,logout, fetchUser } from "../redux/userSlice";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const LoginAndSecurity = () => {
  const dispatch=useDispatch()
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
const[detail,setDetail]=useState({ name:"",
  email:"",
  phone:"",
  password:""})
  const handleDetailChange=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setDetail({...detail,[name]:value})
  }
  useEffect(()=>{
    dispatch(fetchUser())
  },[])
  return (
    <div className="w-screen mt-14 p-2 sm:p-5">
      <div className="container m-auto w-full">
        <div className="name flex bg-gray-100 py-5 px-10 items-center justify-between my-5">
          <div className="left">
            <p className="font-semibold">Name</p>
            {editingName ? (
              <div className="flex-col">
                <input type="text" name="name" defaultValue={user?.name} className="py-2" onChange={(e)=>{handleDetailChange(e)}}/>
              </div>
            ) : (
              <>
                <p>{user?.name}</p>
              </>
            )}
          </div>
          <div className="right">
            {editingName ? (
              <>
                <div className="flex items-center gap-3">
                  <FaCheck
                    className="fill-green-600 self-center"
                    onClick={() => {
                      dispatch(updateUserDetails(detail))
                      setEditingName(!editingName);
                    }}
                  />
                  <FcCancel className="size-4" onClick={()=>{setEditingName(!editingName)}}/>
                </div>
              </>
            ) : (
              <MdOutlineEdit
                onClick={() => {
                  setEditingName(!editingName);
                }}
              />
            )}
          </div>
        </div>
        <div className="email flex bg-gray-100 py-5 px-10 items-center justify-between my-5">
          <div className="left">
            <p className="font-semibold">Email</p>
            {editingEmail ? (
              <div className="flex-col">
                <input
                name="email" 
                  type="text"
                  defaultValue={user?.email}
                  className="py-2"
                  onChange={(e)=>{handleDetailChange(e)}}
                />
              </div>
            ) : (
              <>
                <p>{user?.email}</p>
              </>
            )}
          </div>
          <div className="right">
            {editingEmail ? (
              <>
                <div className="flex items-center gap-3">
                  <FaCheck
                    className="fill-green-600 self-center"
                    onClick={() => {
                      dispatch(updateUserDetails(detail))
                      setEditingEmail(!editingEmail);
                    }}
                  />
                  <FcCancel className="size-4" onClick={()=>{setEditingEmail(!editingEmail)}} />
                </div>
              </>
            ) : (
              <MdOutlineEdit
                onClick={() => {
                  setEditingEmail(!editingEmail);
                }}
              />
            )}
          </div>
        </div>
        <div className="mobile-no flex bg-gray-100 py-5 px-10 items-center justify-between my-5">
          <div className="left">
            <p className="font-semibold">Mobile</p>
            {editingPhone ? (
              <div className="flex-col">
                <input
                name="phone"
                  type="text"
                  defaultValue={user?.phone}
                  className="py-2"
                  onChange={(e)=>{handleDetailChange(e)}}
                />
              </div>
            ) : (
              <>
                <p>{user?.phone}</p>
              </>
            )}
          </div>
          <div className="right">
            {editingPhone ? (
              <>
                <div className="flex items-center gap-3">
                  <FaCheck
                    className="fill-green-600 self-center"
                    onClick={() => {
                      dispatch(updateUserDetails(detail))
                      setEditingPhone(!editingPhone);
                    }}
                  />
                  <FcCancel className="size-4" onClick={()=>{setEditingPhone(!editingPhone)}}/>
                </div>
              </>
            ) : (
              <MdOutlineEdit
                onClick={() => {
                  setEditingPhone(!editingPhone);
                }}
              />
            )}
          </div>
        </div>
        <div className="password flex bg-gray-100 py-5 px-10 items-center justify-between my-5">
          <div className="left">
            <p className="font-semibold">Password</p>
            {editingPassword ? (
              <div className="flex-col">
                <input
                name="password"
                  type="text"
                  className="py-2"
                  onChange={(e)=>{handleDetailChange(e)}}
                />
              </div>
            ) : (
              <>
                <p>********</p>
              </>
            )}
          </div>
          <div className="right">
            {editingPassword ? (
              <>
                <div className="flex items-center gap-3">
                  <FaCheck
                    className="fill-green-600 self-center"
                    onClick={() => {
                      dispatch(updateUserDetails(detail

                      ))
                      setEditingPassword(!editingPassword);
                    }}
                  />
                  <FcCancel className="size-4" onClick={()=>{setEditingPassword(!editingPassword)}} />
                </div>
              </>
            ) : (
              <MdOutlineEdit
                onClick={() => {
                  setEditingPassword(!editingPassword);
                }}
              />
            )}
          </div>
        </div>
      <p onClick={()=>dispatch(logout())} className="text-xl font-bold text-red-600 flex gap-2 items-center">Logout <FaRegArrowAltCircleRight /></p>
    
      </div>
    </div>
  );
};

export default LoginAndSecurity;
