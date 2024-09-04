import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk("login", async (details) => {
  const response = await axios.post("/api/user/login", details, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  return response.data;
});
export const signup = createAsyncThunk("signup", async (details) => {
  const response = await axios.post("/api/user/signup", details, {
    headers: { Accept: "application/json" },
  });
  return response.data;
});
export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await axios.get("/api/user");
  return response.data;
});
export const addAddress = createAsyncThunk("addAddress", async (details) => {
  const response = await axios.patch("/api/user/add-address", details, {
    headers: { Accept: "application/json" },
  });
  return response.data;
});
export const updateCart = createAsyncThunk("updateCart", async (cart) => {
  const response = await axios.patch(
    "/api/user/update-cart",
    { cart },
    { headers: { Accept: "application/json" } }
  );
  return response.data;
});
export const createOrder = createAsyncThunk("createOrder",async ({order,address,deliveryDate,razorpayOrderId=null,paymentMode}) => {
    const response = await axios.post(
      "/api/order/create-order",
      { order, razorpayOrderId, address, deliveryDate, paymentMode },
      { headers: { Accept: "application/json" } }
    );
    return response.data;
  }
);
export const updateUserDetails=createAsyncThunk("updateUserDetails",async(detail)=>{
    const response=await axios.patch(`/api/user/update-user-detail?detail=${JSON.stringify(detail)}`)
    return response.data
})
export const requestCancellation=createAsyncThunk("requestCancellation",async({orderId,productId})=>{
  const response=await axios.patch(`/api/order/request-cancellation?orderId=${orderId}&productId=${productId}`)
  return response.data
})
export const logout=createAsyncThunk("logout",async()=>{
  const response=await axios.post("/api/user/logout")
  return response
})
const userSlice = createSlice({
  name: "user",
  initialState: {
    role:"guest",
    currentUser: null,
    users: [],
    loggedIn: false,
    userIsLoading: false,
    userError: false,
    cart: [],
    usersAreLoading: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct=state.cart.findIndex(product=>product._id===action.payload._id)
      if(existingProduct===-1){
        const temp = { ...action.payload, quantity: 1 ,cancelling:false};
        state.cart.push(temp);
      }else{
        state.cart[existingProduct].quantity=state.cart[existingProduct].quantity+1
      }

    },
    deleteFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
    },
    addProductQuantity: (state, action) => {
      state.cart[action.payload].quantity += 1;
    },
    removeProductQuantity: (state, action) => {
      state.cart[action.payload].quantity -= 1;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = JSON.parse(action.payload);
    },
    setCart: (state, action) => {
      state.cart = JSON.parse(action.payload);
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.userError = false;
      state.userIsLoading = false;
      window.location.href = "/";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
    // LOGOUT
    builder.addCase(logout.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.currentUser =null;
      localStorage.removeItem("user");
      state.userError = false;
      state.userIsLoading = false;
      window.location.href = "/login";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
    // SIGNUP
    builder.addCase(signup.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.userError = false;
      state.userIsLoading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
    // FETCH USER
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.userError = false;
      state.userIsLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
      window.location.href("/login");
    });
    // ADD ADDRESS
    builder.addCase(addAddress.pending, (state, action) => {
      state.userError = false;
      state.userIsLoading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.userError = false;
      state.userIsLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
    // UPDATE CART
    builder.addCase(updateCart.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.userIsLoading = false;
      state.userError = false;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.userIsLoading = false;
      state.userError = true;
    });
    // CREATE ORDER
    builder.addCase(createOrder.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user",JSON.stringify(action.payload))
      state.userIsLoading = false;
      state.userError = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.userIsLoading = false;
      state.userError = true;
    });
    // UPDATE USER DETAILS
    builder.addCase(updateUserDetails.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.userError = false;
      state.userIsLoading = false;
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
    // REQUEST CANCELLATION
    builder.addCase(requestCancellation.pending, (state, action) => {
      state.userIsLoading = true;
      state.userError = false;
    });
    builder.addCase(requestCancellation.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.userError = false;
      state.userIsLoading = false;
    });
    builder.addCase(requestCancellation.rejected, (state, action) => {
      state.userError = true;
      state.userIsLoading = false;
    });
  },
});
export const {
  addToCart,
  deleteFromCart,
  addProductQuantity,
  removeProductQuantity,
  setCurrentUser,
  setCart,
} = userSlice.actions;
export default userSlice.reducer;

// 