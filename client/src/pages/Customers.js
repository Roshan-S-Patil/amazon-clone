import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllcustomers,
  changeRole,
  searchCustomers,
} from "../redux/AdminSlice";
import { useNavigate } from "react-router-dom";
const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, customersAreLoading } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAllcustomers());
  }, []);
  const changeCustomerRole = (customer_id, role) => {
    dispatch(changeRole({ customer_id, role }));
  };

  const searchCustomer = (e) => {
    e.preventDefault();
    const customerName = e.target.value;
    if (customerName.length > 0) {
      dispatch(searchCustomers(customerName));
    } else {
      dispatch(fetchAllcustomers());
    }
  };
  return (
    <div className="mt-14">
       <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} >Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} >Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} className=''>Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} className=''>Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}}>Cancellation Requests</button>
      </div>
      <input
      className="border-2 rounded-md"
        type="text"
        placeholder="Search User"
        onChange={(e) => {
          searchCustomer(e);
        }}
      />
      <div className="heading gap-5 grid grid-cols-5 bg-gray-100 p-3 mt-10 items-center justify-center">
        <p>User ID</p>
        <p>Name</p>
        <p>Phone</p>
        <p>Role</p>
        <p>Edit Role</p>
        <p></p>
      </div>
      {customersAreLoading ? (
        <>
          <h1
            className="text-2xl font-bold"
          >
            Wait! Loading...
          </h1>
        </>
      ) : (
        <>
          {customers?.map((customer) => {
            return (
              <>
                <div className="grid grid-cols-5 gap-5 p-3 items-center justify-center">
                  <p className="overflow-hidden">
                    <p
                      onClick={() => {
                        navigate(`/individual-product/${customer._id}`);
                      }}
                    >
                      {customer._id}
                    </p>
                  </p>
                  <p>{customer.name}</p>
                  <p>{customer.phone}</p>
                  <p
                    style={{
                      backgroundColor: `${
                        customer.role === "user" ? "green" : "red"
                      }`,
                    }}
                    className="w-fit px-3 py-2 text-white rounded hover:cursor-pointer"
                  >
                    {customer.role}
                  </p>
                  {customer.role === "user" ? (
                    <>
                      <p
                        onClick={() => {
                          changeCustomerRole(customer._id, "admin");
                        }}
                        className="bg-gray-100 py-2 px-3 rounded hover:cursor-pointer"
                      >
                        Change to Admin
                      </p>
                    </>
                  ) : (
                    <p
                      onClick={() => {
                        changeCustomerRole(customer._id, "user");
                      }}
                      className="bg-gray-100 py-2 px-3 rounded hover:cursor-pointer"
                    >
                      Change to User
                    </p>
                  )}
                </div>
                <hr />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Customers;

// 