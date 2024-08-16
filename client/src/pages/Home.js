import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setCart } from "../redux/userSlice";
import ProductCardVertical from "../components/ProductCardVertical";
import { FaSearch } from "react-icons/fa";
import { fetchCategories, fetchProduct } from "../redux/productSlice";
import ExploreCategories from "../components/ExploreCategories";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const {categories}=useSelector(state=>state.products)
  //   const [user,setUser]=useState()
  const { cart } = useSelector((state) => state.user);
  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts
  );
  const [searchInput, setSearchInput] = useState("");
  const search = (e) => {
    e.preventDefault();
    dispatch(fetchProduct(searchInput));
  };
  useEffect(() => {
    dispatch(fetchCategories())
    const user = localStorage.getItem("user");
    const localCart = localStorage.getItem("cart");
    if (!user) {
      // dispatch(fetchUser());
    }
    if (user) {
      dispatch(setCurrentUser(user));
    }
    if (localCart) {
      dispatch(setCart(localCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    // 
    <div className=" relative min-h-screen mt-14 max-w-6xl mx-auto">
      <div className="searchbar flex items-center col-span-3 my-5 px-4 sm:px-28">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="p-1 my-5 w-full focus:outline-none searchbar border-2 rounded-lg"
          type="text"
          name="search"
          placeholder="search"
          value={searchInput}
        />
        <button onClick={(e) => search(e)} className="text-white p-3">
          <FaSearch className="fill-gray-950" />
        </button>
      </div>
      {searchedProducts?.map((product) => {
        return <ProductCard product={product} />;
      })}
      <div className="categories my-5">
      {categories?<div className="md:flex md:flex-wrap">
        {categories?.map((category,index)=>{
          return (<div className="my-8 mx-auto">
            <ExploreCategories key={category._id} category={category}/>
          </div>)
        })}
      </div>:<></>}
      </div>
     
      <hr  className="my-5"/>
     
      {cart.length!==0?<>
        <h1 className="text-2xl font-semibold">Cart</h1>
        <div className="mb-10 container cart flex gap-4 sm:gap-10 overflow-x-scroll">
          {cart.map(product=>{return <ProductCardVertical key={product._id}  product={product}/>})}
        </div>
      </>:<></>}
      <Footer/>
      </div>
  );
};
export default Home;
