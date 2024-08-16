import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser, requestCancellation } from "../redux/userSlice";
import CancelledProduct from "../components/CancelledProduct";

const YourOrders = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("orders");
  const { currentUser, userIsLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  // 
  return (
    <div className="mt-14 max-w-6xl m-auto p-2">
      <div className="text-xl sm:text-3xl heading flex gap-10">
        {display === "orders" ? (
          <h1 className="font-bold p-2 bg-gray-200 rounded-tl-lg rounded-tr-lg hover:cursor-pointer">
            Orders
          </h1>
        ) : (
          <h1
            onClick={() => {
              setDisplay("orders");
            }}
            className="font-bold p-2 hover:cursor-pointer"
          >
            Orders
          </h1>
        )}
        {display === "cancelled-orders" ? (
          <h1 className=" font-bold p-2 bg-gray-200 rounded-tl-lg rounded-tr-lg hover:cursor-pointer">
            Cancelled Orders
          </h1>
        ) : (
          <h1
            onClick={() => {
              setDisplay("cancelled-orders");
            }}
            className="font-bold p-2 hover:cursor-pointer"
          >
            Cancelled Orders
          </h1>
        )}
      </div>
      {userIsLoading ? (
        <>
          <h1 className="text=2xl font-bold">Orders Loading...</h1>
        </>
      ) : (
        <>
          {currentUser ? (
            <>
              {display === "orders" ? (
                <>
                  {currentUser.orders.toReversed().map((order) => {
                    return (
                      <div className="ordercard w-full rounded-xl border-gray-100 border-2 my-3">
                        <div className="text-xs sm:text-base top grid grid-cols-2 bg-gray-100 p-3">
                          <div className="left flex justify-between">
                            <div className="left">
                              <p>ORDER PLACED</p>
                              <p>{order.createdAt.slice(0, 10)}</p>
                            </div>
                            <div className="middle">
                              <p>TOTAL</p>
                              <p>
                                Amount Paid{" "}
                                {order.paymentMode === "prepaid" ? (
                                  <>
                                    {order.paymentStatus === "paid" ? (
                                      <p className="text-green-600 bg-green-200 rounded-full justify-center items-center flex">
                                        Successful
                                      </p>
                                    ) : (
                                      <p className="text-red-600 bg-red-200 rounded-full justify-center items-center flex">
                                        Failed
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  <p className="text-sky-600 bg-sky-200 rounded-full justify-center items-center flex px-2">
                                    Cash on delivery
                                  </p>
                                )}
                              </p>
                            </div>
                            <div className="right">
                              <p>ship to</p>
                              <p>{order.address.name.split(" ")[0]}</p>
                            </div>
                          </div>
                          <div className="right text-right">
                            {/* <p>Order-Id-#{order?._id}</p> */}
                            {/* <p>Print Invoice</p> */}
                          </div>
                        </div>
                        {/* BOTTOM */}
                        <div className="text-xs sm:text-base bottom p-3  ">
                          {order?.products.map((product) => {
                            return (
                              <div className="card grid grid-cols-2 my-2" key={product._id}>
                                <div className="left flex gap-4 text-nowrap overflow-hidden">
                                  <img 
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="aspect-square h-20 w-20"
                                  />
                                  <div className="details">
                                    <p onClick={()=>{navigate(`/individual-product/${product._id}`)}} className="text-cyan-600">{product.name}</p>
                                    <p>Qty - {product.quantity}</p>
                                    {order?.status === "processing"&&product.cancelling===false ? (
                                      <p className="bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full">
                                        {order?.status}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                    {order?.status === "cancelling" &&product.cancelling===false? (
                                      <p className="bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full">
                                        {order?.status}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                    {order?.status === "shipped"&&product.cancelling===false ? (
                                      <p className="bg-sky-100 text-sky-600 w-fit px-2 rounded-full">
                                        {order?.status}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                    {order?.status === "delivered"&&product.cancelling===false ? (
                                      <p className="bg-green-100 text-green-600 w-fit px-2 rounded-full">
                                        {order?.status}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                                <div className="right text-right flex flex-col items-end gap-2">
                                  {order?.status !== "delivered" ? (
                                    <>
                                      {product.cancelling === false ? (
                                        <button
                                          onClick={() => {
                                            dispatch(
                                              requestCancellation({
                                                orderId: order._id,
                                                productId: product._id,
                                              })
                                            );
                                          }}
                                          className="bg-gray-100 px-2 w-fit"
                                        >
                                          Cancle Order
                                        </button>
                                      ) : product.cancelled === true ? (
                                        <p className="bg-red-200 text-red-600 rounded-full px-2">
                                          Cancelled
                                        </p>
                                      ) : (
                                        <p className="bg-red-200 text-red-600 rounded-full px-2">
                                          Cancellation Requested
                                        </p>
                                      )}
                                    </>
                                  ) : 
                                  <></>}
                                  {order.status === "delivered" &&product.cancelled!==true && product.cancelling!==true? (
                                    <button
                                      onClick={() =>
                                        navigate(`/write-review/${product}`)
                                      }
                                      className="bg-gray-100 px-2 w-fit"
                                    >
                                      Write a Review
                                    </button>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
              {display === "cancelled-orders" ? (
                <>
                {currentUser.cancelledProducts.map(product=>{
                  return (<CancelledProduct product={product} cancelledProducts/>)
                })}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default YourOrders;
