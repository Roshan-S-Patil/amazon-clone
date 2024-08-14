import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filterByCategory, searchProducts,filterByLessThan3,filterByGreaterThan4,filterBetween3and4 } from "../redux/AdminSlice";
import { useNavigate } from "react-router-dom";
import ProductStrip from "./ProductStrip";
import { fetchCategories } from "../redux/productSlice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { filters, productsAreLoading, productsError,filteredProducts } = useSelector(
    (state) => state.admin
  );
  const { categories } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search.length > 0) {
      dispatch(searchProducts(search));
    } else {
      dispatch(fetchProducts());
    }
  };
  return (
    <div className="mt-14">
       <div className="admin-nav h-full flex gap-5 text-lg py-4 font-bold">
        <button onClick={()=>{navigate("/admin/dashboard")}} >Dashboard</button>
        <button onClick={()=>{navigate("/admin/orders")}} >Orders</button>
        <button onClick={()=>{navigate("/admin/customers")}} >Customers</button>
        <button onClick={()=>{navigate("/admin/products")}} className='bg-gray-200 p-3 rounded-tl-lg rounded-tr-lg'>Products</button>
        <button onClick={()=>{navigate("/admin/reviews")}} className=''>Reviews</button>
        <button onClick={()=>{navigate("/admin/cancellation-requests")}}>Cancellation Requests</button>
      </div>
      {productsError ? (
        <>
          <h1>Product not found</h1>
        </>
      ) : (
        <></>
      )}
      <div className="header grid grid-cols-2 items-center justify-center">
        <input
          type="text"
          placeholder="Search Product"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
        <button
          onClick={() => {
            navigate("/admin/add-product");
          }}
          className="w-fit m-auto text-medium bg-green-100 hover:bg-green-200 p-3"
        >
          Add Product
        </button>
      </div>
      <hr />
      <h1 className="text-2xl font-bold">Filters</h1>
      <div className="filters flex justify-evenly p-5">
        <div className="categories flex flex-col">
          <h1 className="text-xl font-bold my-2">Categories</h1>
          {categories?.map((category) => {
            return (
              <div className="flex items-center gap-4">
                <input type="checkbox" id="category" name="category" value={category._id} onChange={(e)=>dispatch(filterByCategory(e.target.value))}/>
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>
        <div className="ratings">
        <h1 className="text-xl font-bold my-2">Rating</h1>
          <div className="4-and-above-rating flex items-center gap-4">
            <input type="checkbox" name="rating" id="rating" onChange={()=>{(filterByGreaterThan4(!filters.greaterThanEqualTo4))}} />
            <label htmlFor="">4 Star and above</label>
          </div>
          <div className="3-and-belove-rating flex items-center gap-4">
          <input type="checkbox" name="rating" id="rating" onChange={()=>{dispatch(filterByLessThan3(!filters.lessThan3))}} />
          <label htmlFor="">3 Star and below</label>
          </div>
            <div className="between-3-and-4-stars flex items-center gap-4">
            <input type="checkbox" name="rating" id="rating" onChange={()=>{dispatch(filterBetween3and4(filters.between3and4))}}  />
            <label htmlFor="">between 3 and 4 stars</label>
            </div>
        </div>
      </div>
      <div className="heading gap-3 grid grid-cols-7 bg-gray-100 p-3 mt-10">
        <p>Product ID</p>
        <p>Name</p>
        <p>Category</p>
        <p>Sub-Category</p>
        <p> Rating</p>
        <p>Stock</p>
      </div>
      {productsAreLoading ? (
        <h1
          className="text-2xl font-bold
      "
        >
          Wait! Loading...
        </h1>
      ) : (
        <>
          {filteredProducts?.map((product) => {
            return <ProductStrip product={product} />;
          })}
        </>
      )}
    </div>
  );
};

export default Products;
