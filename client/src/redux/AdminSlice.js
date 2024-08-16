import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// FETCH ALL customers
export const fetchAllcustomers=createAsyncThunk("fetchAllcustomers",async()=>{
    const response=await axios.get("/user/all-users");
    return response
})
// CHANGE ROLE TO ADMIN
export const changeRole=createAsyncThunk("changeRole",async({customer_id,role})=>{
  const response=await axios.patch(`/user/change-role?user_id=${customer_id}&role=${role}`)
    return response
  })
//SEARCH CUSTOMERS
export const searchCustomers=createAsyncThunk("searchCustomers",async(customerName)=>{
    const response=await axios.get(`/user/search-user?customerName=${customerName}`);
    return response
})
// FETCH PRODUCTS
export const fetchProducts=createAsyncThunk("fetchProducts",async()=>{
    const response=await axios.get("/products");
    return response
 })
//SEARCHED PRODUCTS
 export const searchProducts=createAsyncThunk("searchProducts",async(search)=>{
    const response=await axios.get(`/products/search?search=${search}`)
    return response
 })
//  UPDATE STOCK
 export const updateStock=createAsyncThunk("updateStock",async({_id,stock})=>{
    const response=await axios.patch(`/products/update-stock?product_id=${_id}&stock=${stock}`)
    return response
 })
//  GET CANCELLATION REQUESTS
export const getCancellationRequests=createAsyncThunk("getCancellationRequests",async()=>{
    const response=await axios.get("/order/get-cancellation-requests")
    return response.data
})
//  GET INDIVIDUAL REQUEST
export const getIndividualCancellationRequest=createAsyncThunk("getIndividualCancellationRequest",async(reqId)=>{
    const response=await axios.get(`/order/get-individual-cancellation-request?reqId=${reqId}`)
    return response.data
})
//  ACCEPT CANCELLATION REQUESTS
export const accepCancellationRequest=createAsyncThunk("accepCancellationRequest",async({orderId,productId,quantity,amount,paymentId,reqId,userId})=>{
    const response=await axios.patch(`/order/accept-cancellation-request?userId=${userId}&reqId=${reqId}&orderId=${orderId}&productId=${productId}&quantity=${quantity}&amount=${amount}&paymentId=${paymentId}`)
    return response.data
})
//  DENY CANCELLATION REQUESTS
export const denyCancellationRequest=createAsyncThunk("denyCancellationRequest",async({reqId,productId,orderId})=>{
    const response=await axios.patch(`/order/deny-cancellation-request?reqId=${reqId}&productId=${productId}&orderId=${orderId}`)
    return response.data
})
export const fetchIndividualOrder=createAsyncThunk("fetchIndividualOrder",async(orderId)=>{
    const response=await axios.get(`/order/individual-order?orderId=${orderId}`)
    return response.data
})
export const changeOrderStatus=createAsyncThunk("changeOrderStatus",async({orderId,status})=>{
    const response=await axios.patch(`/order/change-status?orderId=${orderId}&status=${status}`)
    return response.data
})
//  FILTER PRODUCTS
 const filterProducts=(products,filters)=>{
  return products=products.filter(product=>{
    const categoryMatch= filters.category.length===0||filters.category.includes(product.category._id)
    const ratingLessThan3= filters.lessThan3===false||(Math.round(product?.totalRating/product?.numberOfReviews*10)/10)<3
    const ratingGreaterThanEqualTo4= filters.greaterThanEqualTo4===false||4<=(Math.round(product?.totalRating/product?.numberOfReviews*10)/10)
    const ratingBetween3And4= filters.between3and4===false||(3<(Math.round(product?.totalRating/product?.numberOfReviews*10)/10)&&(Math.round(product?.totalRating/product?.numberOfReviews*10)/10)<4)
    return categoryMatch&&ratingBetween3And4&&ratingLessThan3&&ratingGreaterThanEqualTo4
  })
 }
const adminSlice=createSlice(({
    name:"admin",
    initialState:{
        products:[],
        filteredProducts:[],
        individualProduct:[],
        productIsLoading:false,
        searchedCustomers:[],
        customerIsLoading:false,
        productsAreLoading:false,
        productsError:false,
        customers:[],
        customersAreLoading:false,
        customersError:false,
        orders:[],
        ordersAreLoading:false,
        ordersError:false,
        reviews:[],
        reviewsAreLoading:false,
        reviewsError:false,
        cancelationRequests:null,
        cancelationRequestsAreLoading:false,
        cancelationRequestsError:false,
        individualCancellationRequest:null,
        individualOrder:null,
        filters:{
            category:[],
            lessThan3:false,
            greaterThanEqualTo4:false,
            between3and4:false,
        }
    }, 
    reducers:{
        filterByCategory:(state,action)=>{
            if(state.filters.category.includes(action.payload)===true){
                state.filters.category=state.filters.category.filter(category=>category!==action.payload)
            }else{
                state.filters.category.push(action.payload)
            }
            state.filteredProducts=filterProducts(state.products,state.filters)
        },
        filterByLessThan3:(state,action)=>{
            state.filters.lessThan3=!(state.filters.lessThan3)
            state.filteredProducts=filterProducts(state.products,state.filters)
        },
        filterByGreaterThan4:(state,action)=>{
            state.filters.greaterThanEqualTo4=!(state.filters.greaterThanEqualTo4)
            state.filteredProducts=filterProducts(state.products,state.filters)
        },
        filterBetween3and4:(state,action)=>{
            state.filters.between3and4=!(state.filters.between3and4)
            state.filteredProducts=filterProducts(state.products,state.filters)
        },
    },
    extraReducers:(builder)=>{
        
        // FETCH ALL CUSTOMERS
        builder.addCase(fetchAllcustomers.pending,(state,action)=>{
            state.customersAreLoading=true;
            state.userError=false
        });
        builder.addCase(fetchAllcustomers.fulfilled,(state,action)=>{
            state.customers=action.payload.data;
            localStorage.setItem("customers",JSON.stringify(action.payload.data))
            state.userError=false;
            state.customersAreLoading=false;
        })
        builder.addCase(fetchAllcustomers.rejected,(state,action)=>{
            state.userError=true;
            state.customersAreLoading=false;
            window.location.href = '/login';
        })
        // FETCH SEARCHED CUSTOMER
        builder.addCase(searchCustomers.pending,(state,action)=>{
            state.customersAreLoading=true;
            state.userError=false
        });
        builder.addCase(searchCustomers.fulfilled,(state,action)=>{
            state.customers=action.payload.data;
            localStorage.setItem("customers",JSON.stringify(action.payload.data))
            state.userError=false;
            state.customersAreLoading=false;
        })
        builder.addCase(searchCustomers.rejected,(state,action)=>{
            state.userError=true;
            state.customersAreLoading=false;
            window.location.href = '/login';
        })
        // CHANGE ROLE TO ADMIN
        builder.addCase(changeRole.pending,(state,action)=>{
            state.customersAreLoading=true;
            state.userError=false
        });
        builder.addCase(changeRole.fulfilled,(state,action)=>{
            state.customers.forEach(customer=>{
                if(customer._id===action.payload.data._id){
                    customer.role=action.payload.data.role
                }
            })
            localStorage.setItem("customers",JSON.stringify(state.customers))
            state.userError=false;
            state.customersAreLoading=false;
        })
        builder.addCase(changeRole.rejected,(state,action)=>{
            state.userError=true;
            state.customersAreLoading=false;
            window.location.href = '/login';
        })
        //FETCH PRODUCTS
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.productsAreLoading=true;    
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
         state.products=action.payload.data
         state.filteredProducts=action.payload.data
            state.productsAreLoading=false;
            state.productsError=false;      
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.productsAreLoading=false;
            state.productsError=true       
        })
        // SEARCH PRODUCTS
        builder.addCase(searchProducts.pending,(state,action)=>{
            state.productsAreLoading=true;  
            state.productsError=false      
        })
        builder.addCase(searchProducts.fulfilled,(state,action)=>{
            state.products=action.payload.data
            state.filteredProducts=action.payload.data
            state.productsAreLoading=false;
            state.productsError=false       
        })
        builder.addCase(searchProducts.rejected,(state,action)=>{
            state.productsAreLoading=false;
            state.productsError=true       
        })
        // UPDATE STOCK
        builder.addCase(updateStock.pending,(state,action)=>{
            state.productIsLoading=true;
            state.productsError=false
        });
        builder.addCase(updateStock.fulfilled,(state,action)=>{
            state.products.forEach(product=>{
                if(product._id===action.payload.data._id){
                    product.stock=action.payload.data.stock
                }
            })
            state.filteredProducts.forEach(product=>{
                if(product._id===action.payload.data._id){
                    product.stock=action.payload.data.stock
                }
            })
            localStorage.setItem("customers",JSON.stringify(state.customers))
            state.productsError=false;
            state.productIsLoading=false;
        })
        builder.addCase(updateStock.rejected,(state,action)=>{
            state.productsError=true;
            state.productIsLoading=false;
            window.location.href = '/login';
        })
        builder.addCase(getCancellationRequests.pending,(state,action)=>{
            state.cancelationRequestsAreLoading=true
            state.cancelationRequestsError=false
        })
        builder.addCase(getCancellationRequests.fulfilled,(state,action)=>{
            state.cancelationRequests=action.payload
            state.cancelationRequestsAreLoading=false
            state.cancelationRequestsError=false
        })
        builder.addCase(getCancellationRequests.rejected,(state,action)=>{
            state.cancelationRequestsAreLoading=false;
            state.cancelationRequestsError=true;
        })
        //GET INDIVIDUAL CANCELATION REQUEST
        builder.addCase(getIndividualCancellationRequest.pending,(state)=>{
            state.cancelationRequestsAreLoading=true
            state.cancelationRequestsError=false
        })
        builder.addCase(getIndividualCancellationRequest.fulfilled,(state,action)=>{
            state.individualCancellationRequest=action.payload
            state.cancelationRequestsAreLoading=false
            state.cancelationRequestsError=false
        })
        builder.addCase(getIndividualCancellationRequest.rejected,(state,action)=>{
            state.cancelationRequestsAreLoading=false;
            state.cancelationRequestsError=true;
        })
        // ACCEPT CANCELLATION
        builder.addCase(accepCancellationRequest.pending,(state)=>{
            state.cancelationRequestsAreLoading=true
            state.cancelationRequestsError=false
        })
        builder.addCase(accepCancellationRequest.fulfilled,(state,action)=>{
            state.individualCancellationRequest=action.payload
            state.cancelationRequestsAreLoading=false
            state.cancelationRequestsError=false
        })
        builder.addCase(accepCancellationRequest.rejected,(state,action)=>{
            state.cancelationRequestsAreLoading=false;
            state.cancelationRequestsError=true;
        })
        // DENY CANCELLATION
        builder.addCase(denyCancellationRequest.pending,(state)=>{
            state.cancelationRequestsAreLoading=true
            state.cancelationRequestsError=false
        })
        builder.addCase(denyCancellationRequest.fulfilled,(state,action)=>{
            state.individualCancellationRequest=action.payload
            state.cancelationRequestsAreLoading=false
            state.cancelationRequestsError=false
        })
        builder.addCase(denyCancellationRequest.rejected,(state,action)=>{
            state.cancelationRequestsAreLoading=false;
            state.cancelationRequestsError=true;
        }) 
        // FETCH INDIVIDUAL ORDER
        builder.addCase(fetchIndividualOrder.pending,(state)=>{
            state.ordersAreLoading=true
            state.ordersError=false
        })
        builder.addCase(fetchIndividualOrder.fulfilled,(state,action)=>{
            state.individualOrder=action.payload
            state.ordersAreLoading=false
            state.ordersError=false
        })
        builder.addCase(fetchIndividualOrder.rejected,(state,action)=>{
            state.ordersAreLoading=false;
            state.ordersError=true;
        }) 
        // CHANGE ORDER STATUS
        builder.addCase(changeOrderStatus.pending,(state)=>{
            state.ordersAreLoading=true
            state.ordersError=false
        })
        builder.addCase(changeOrderStatus.fulfilled,(state,action)=>{
            state.individualOrder=action.payload
            state.ordersAreLoading=false
            state.ordersError=false
        })
        builder.addCase(changeOrderStatus.rejected,(state,action)=>{
            state.ordersAreLoading=false;
            state.ordersError=true;
        }) 
    }
}))
export const {filterByCategory,filterByLessThan3,filterBetween3and4,filterByGreaterThan4}=adminSlice.actions
export default adminSlice.reducer
// 