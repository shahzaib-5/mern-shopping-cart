import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./pages/home/home";
import { HomeContextProvider } from "./context/homeContext";
import CartModal from "./pages/cart/CartModal";
import { Signin } from "./pages/signin/signin";
import { Signup } from "./pages/signup/signup";
import { AddProduct } from "./pages/addProduct/AddProduct";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/admin/Admin";
import ProductDetails from "./pages/admin/ProductDetails";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // const decodedToken = jwtDecode(token); 
      // if (decodedToken) {
      //   setUserId(decodedToken.userId); //track current user
      // }
    }
  }, []);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleLogin = (user, token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUserId(user._id); //track current user
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(null); 
  };

  return (
    <div className="App">
      <HomeContextProvider>
        <Router>
          <NavBar
            openCartModal={openCartModal}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
          <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Home /> : <Signin handleLogin={handleLogin} setUserId={setUserId} />
              }
            />
            <Route
              path="/signin"
              element={<Signin handleLogin={handleLogin} setUserId={setUserId} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/admin/update/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
        {isCartModalOpen && <CartModal closeModal={closeCartModal} userId={userId} />}
      </HomeContextProvider>
    </div>
  );
}

export default App;
