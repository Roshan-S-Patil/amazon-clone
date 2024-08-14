import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
export const fetchProduct=createAsyncThunk("fetchSearchedProducts",async(searchInput)=>{
        const response=await axios.get(`/products/search?search=${searchInput}`)
        return response;

})
 export const fetchIndividualProduct=createAsyncThunk("fetchIndividual",async(product)=>{
    const response=await axios.get(`/products/search-individual?product=${product}`)
    return response
 })
 export const fetchCategories=createAsyncThunk("fetchCategories",async()=>{
    const response=await axios.get("/products/categories")
    console.log(response)
    return response
 })
 export const fetchIndividualCategory=createAsyncThunk("fetchIndividualCategory",async(category)=>{
    const response=await axios.get(`/products/individual-category?category=${category}`)
    return response.data
 })
 export const fetchProductsOfCategory=createAsyncThunk("fetchProductsOfCategory",async(category)=>{
    const response = await axios.get(`/products/products-of-category?category=${category}`)
    return response.data
 })
 export const fetchProductsOfSubCategory=createAsyncThunk("fetchProductsOfSubCategory",async(subcategory)=>{
    const response = await axios.get(`/products/products-of-subcategory?subcategory=${subcategory}`)
    return response.data
 })
const searchProductSlice=createSlice({
    name:"search",
    initialState:{
        individualProduct:null,
        searchedProducts:null,
        buyNow:null,
        allProducts:null,
        categories:null,
        individualCategory:null,
        categoryWiseProducts:null,
        subCategoryWiseProducts:null,
        productsLoading:false,
        productsError:false,
        individualProductLoading:false,
        individualProductError:false
    },
    reducers:{
        clearSearch:(state,action)=>{
            state.searchedProducts=action.payload
        },
        currentProduct:(state,action)=>{
            state.currentProduct=action.payload
        },
        addBuyNow:(state,action)=>{
            state.buyNow=action.payload
            localStorage.setItem("buyNow",JSON.stringify(action.payload))
        }
        
    },
extraReducers:(builder)=>{
    builder.addCase(fetchProduct.pending,(state,action)=>{
        state.productsLoading=true;     
    })
    builder.addCase(fetchProduct.fulfilled,(state,action)=>{
     state.searchedProducts=action.payload.data
        state.productsLoading=false;
        state.productsError=false      
    })
    builder.addCase(fetchProduct.rejected,(state,action)=>{
        state.productsLoading=false;
        state.productsError=true       
    })
    builder.addCase(fetchIndividualProduct.pending,(state,action)=>{
        state.individualProductLoading=true;    

    })
    builder.addCase(fetchIndividualProduct.fulfilled,(state,action)=>{
        state.individualProductError=false;
        state.individualProduct=action.payload.data;
        state.individualProductLoading=false;   

    })
    builder.addCase(fetchIndividualProduct.rejected,(state,action)=>{
        state.individualProductError=true;   
    })
    // Fetch Categories
    builder.addCase(fetchCategories.pending,(state,action)=>{
        state.productsLoading=true;     
    })
    builder.addCase(fetchCategories.fulfilled,(state,action)=>{
     state.categories=action.payload.data
        state.productsLoading=false;
        state.productsError=false       
    })
    builder.addCase(fetchCategories.rejected,(state,action)=>{
        state.productsLoading=false;
        state.productsError=true        
    })
    // FETCH PRODUCT OF CATEGORY
    builder.addCase(fetchProductsOfCategory.pending,(state,action)=>{
        state.productsLoading=true;       
    })
    builder.addCase(fetchProductsOfCategory.fulfilled,(state,action)=>{
     state.categoryWiseProducts=action.payload
        state.productsLoading=false;
        state.productsError=false      
    })
    builder.addCase(fetchProductsOfCategory.rejected,(state,action)=>{
        state.productsLoading=false;
        state.productsError=true       
    })
    // FETCH PRODUCT OF SUBCATEGORY
    builder.addCase(fetchProductsOfSubCategory.pending,(state,action)=>{
        state.productsLoading=true;       
    })
    builder.addCase(fetchProductsOfSubCategory.fulfilled,(state,action)=>{
     state.subCategoryWiseProducts=action.payload
        state.productsLoading=false;
        state.productsError=false     
    })
    builder.addCase(fetchProductsOfSubCategory.rejected,(state,action)=>{
        state.productsLoading=false;
        state.productsError=true      
    })
    // FETCH INDIVIDUAL CATEGORY
    builder.addCase(fetchIndividualCategory.pending,(state,action)=>{
        state.productsLoading=true;      
    })
    builder.addCase(fetchIndividualCategory.fulfilled,(state,action)=>{
     state.individualCategory=action.payload
        state.productsLoading=false;
        state.productsError=false      
    })
    builder.addCase(fetchIndividualCategory.rejected,(state,action)=>{
        state.productsLoading=false;
        state.productsError=true       
    })

}}
        
)
export const {clearSearch,currentProduct,addBuyNow}=searchProductSlice.actions
export default searchProductSlice.reducer;