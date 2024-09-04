import './App.css';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom"
import IndividualProduct from './pages/IndividualProduct';
import Order from './pages/Order';
import LoginAndSignup from './pages/LoginAndSignup';
import Cart from './pages/Cart';
import YourAddresses from "./pages/YourAddresses"
import Profile from './pages/Profile';
import YourOrders from './pages/YourOrders';
import AddProduct from './pages/AddProduct';
import OrderCompletion from './pages/OrderCompletion';
import WriteReview from './pages/WriteReview';
import ManageOrder from './pages/ManageOrder';
import LoginAndSecurity from "./pages/LoginAndSecurity"
import IndividualCancellationRequest from './pages/IndividualCancellationRequest';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from "./pages/Customers"
import Reviews from './pages/Reviews';
import Products from "./pages/Products"
import CancellationRequests from "./pages/CancellationRequests"
import { useSelector } from 'react-redux';
import Categories from './pages/Categories';

function App() {
  const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const role = useSelector((state) => state.user.currentUser?.role);
    if(role){return allowedRoles.includes(role) ? <Component /> : <Navigate to="/" />} ;
  };
  return (
    <div className="App xl min-h-screen overflow-x-hidden ">
      <Router>
      <Navbar/>
      <Routes>
        {/* OPEN ROUTES */}
          <Route exact path='/login' element={<LoginAndSignup/>}/>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/individual-product/:product' element={<IndividualProduct/>}/>
          <Route exact path="/category/:category" element={<Categories/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
        {/* LOGGEDIN ROUTES */}
          <Route exact path='/order-page' element={<Order/>}/>
          <Route exact path='/order-completion' element={<OrderCompletion/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/profile/your-orders' element={<YourOrders/>}/>
          <Route exact path='/profile/addresses' element={<YourAddresses/>}/>
          <Route exact path='/profile/login-and-security/:_id' element={<LoginAndSecurity/>}/>
          <Route exact path='/write-review/:reviewOfProduct' element={<WriteReview/>}/>
        {/* ADMIN ROUTES */}
          <Route exact path='admin/manage-order/:orderId' element={<ProtectedRoute element={ManageOrder} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/add-product' element={<ProtectedRoute element={AddProduct} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/dashboard' element={<ProtectedRoute element={Dashboard} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/orders' element={<ProtectedRoute element={Orders} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/customers' element={<ProtectedRoute element={Customers} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/reviews' element={<ProtectedRoute element={Reviews} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/products'element={<ProtectedRoute element={Products} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/cancellation-requests' element={<ProtectedRoute element={CancellationRequests} allowedRoles={['admin']}/>}/>
          <Route exact path='/admin/individual-cancelation-request/:reqId' element={<ProtectedRoute element={IndividualCancellationRequest} allowedRoles={['admin']}/>}/>
          <Route path='*' element={<Navigate to={"/"}/>}/> 
          </Routes>
      </Router>
    </div>
  );
}
// 

export default App;
