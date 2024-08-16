import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  accepCancellationRequest,
  denyCancellationRequest,
  getIndividualCancellationRequest,
} from "../redux/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

const IndividualCancellationRequest = () => {
  const { reqId } = useParams();
  const dispatch = useDispatch();
  const [toggleReload, setReload] = useState();
  const { individualCancellationRequest } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getIndividualCancellationRequest(reqId));
  }, []);
  return (
    // 
    <div className="mt-14">
      {individualCancellationRequest ? (
        <>
          <div className="top grid grid-cols-2 bg-gray-100 p-3">
            <div className="left flex justify-between">
              <div className="left">
                <p>ORDER PLACED</p>
                <p>
                  {individualCancellationRequest.orderId.createdAt.slice(0, 10)}
                </p>
              </div>
              <div className="middle">
                <p>TOTAL</p>
                <p>
                  Amount Paid{" "}
                  {individualCancellationRequest.orderId.paymentMode ===
                  "prepaid" ? (
                    <>
                      {individualCancellationRequest.orderId.paymentStatus ===
                      "paid" ? (
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
                <p>
                  {
                    individualCancellationRequest.orderId.address.name.split(
                      " "
                    )[0]
                  }
                </p>
              </div>
            </div>
            <div className="right text-right">
              <p>Request-Id-#{individualCancellationRequest._id}</p>
            </div>
          </div>
          <div className="bottom p-3  ">
            {individualCancellationRequest.orderId?.products.map((product) => {
              return (
                <div className="card grid grid-cols-2 my-2">
                  <div className="left flex gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20"
                    />
                    <div className="details">
                      <p>{product.name}</p>
                      <p>Quantity - {product.quantity}</p>
                      {individualCancellationRequest.orderId?.status ===
                      "processing" ? (
                        <p className="bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full">
                          {individualCancellationRequest.orderId?.status}
                        </p>
                      ) : (
                        <></>
                      )}
                      {individualCancellationRequest.orderId?.status ===
                      "cancelling" ? (
                        <p className="bg-yellow-100 text-yellow-600 w-fit px-2 rounded-full">
                          {individualCancellationRequest.orderId?.status}
                        </p>
                      ) : (
                        <></>
                      )}
                      {individualCancellationRequest.orderId?.status ===
                      "shipped" ? (
                        <p className="bg-sky-100 text-sky-600 w-fit px-2 rounded-full">
                          {individualCancellationRequest.orderId?.status}
                        </p>
                      ) : (
                        <></>
                      )}
                      {individualCancellationRequest.orderId?.status ===
                      "delivered" ? (
                        <p className="bg-green-100 text-green-600 w-fit px-2 rounded-full">
                          {individualCancellationRequest.orderId?.status}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="right text-right flex flex-col items-end gap-2">
                    {individualCancellationRequest.productId === product._id &&
                    product.cancelling === true ? (
                      <>
                        <button
                          onClick={() =>
                            dispatch(
                              accepCancellationRequest({
                                reqId: individualCancellationRequest._id,
                                paymentId:individualCancellationRequest.orderId.razorpay_payment_id,
                                amount:0.9 *(product.sellingPrice * product.quantity),
                                quantity: product.quantity,
                                orderId:individualCancellationRequest.orderId._id,
                                productId: product._id,
                                userId:individualCancellationRequest.createdBy
                              })
                            )
                          }
                          className="text-green-600 bg-green-200 px-2 rounded-full"
                        >
                          Accept Cancellation
                        </button>
                        <button
                          onClick={() => {
                            dispatch(
                              denyCancellationRequest({
                                reqId,
                                productId: product._id,
                                orderId:
                                  individualCancellationRequest.orderId._id,
                              })
                            );
                          }}
                          className="text-red-600 bg-red-200 px-2 rounded-full"
                        >
                          Deny Cancellation
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    {individualCancellationRequest.productId === product._id &&
                    product.cancelling === false ? (
                      <>
                        {individualCancellationRequest.status === "denied" ? (
                          <p className="text-red-600 bg-red-200 px-2 rounded-full">
                            {individualCancellationRequest?.status}
                          </p>
                        ) : (
                          <></>
                        )}
                        {individualCancellationRequest.status === "accepted" ? (
                          <p className="text-green-600 bg-green-200 px-2 rounded-full">
                            {individualCancellationRequest?.status}
                          </p>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default IndividualCancellationRequest;
