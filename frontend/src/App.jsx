import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetailsAsync } from "./features/userSlice";
import DashboardPage from "./pages/DashboardPage";
import Toast from "./components/Toast";
import WishlistPage from "./pages/WishlistPage";
import { getWishlistAsync } from "./features/wishlistSlice";
import { fetchCartAsync, setTotalPrice } from "./features/cartSlice";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetailsAsync());
    // dispatch(getWishlistAsync());
    dispatch(fetchCartAsync());
    dispatch(setTotalPrice());
    dispatch(fetchCartAsync());
  }, []);
  return (
    <>
      <div className="">
        <Router>
          <div className="mx-auto">
            <Toast />
          </div>
          <div className="navbar-container fixed top-0 left-0 right-0 z-50 px-10 ">
            <Navbar />
          </div>
          <div className="md:mt-20 mt-36">
            <Routes>
              <Route exact path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/order" element={<OrderPage />}></Route>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/wishlist" element={<WishlistPage />}></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
