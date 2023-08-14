import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import HomeCarousel from "./components/HomeCarousel";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import ProductsList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDisplay from "./components/ProductDisplay";
import Paystack from "./components/Paystack";
import Product from "./components/Product";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />

      <Routes>
        {/* <Route path='/' element={<HomeCarousel />} /> */}
        <Route path='/' element={<ProductDisplay />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/sell' element={<CreateProduct />} />
        <Route path='/Productlist' element={<ProductsList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/paystack' element={<Paystack />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
