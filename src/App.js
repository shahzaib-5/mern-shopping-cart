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

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check user's authentication status on initial load
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleLogout = () => {
    // Clear the token from localStorage and update isLoggedIn state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleLogin = (user, token) => {
    // Store the token in localStorage and update isLoggedIn state
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
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
                isLoggedIn ? <Home /> : <Signin handleLogin={handleLogin} />
              }
            />
            <Route
              path="/signin"
              element={<Signin handleLogin={handleLogin} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        </Router>
        {isCartModalOpen && <CartModal closeModal={closeCartModal} />}
      </HomeContextProvider>
    </div>
  );
}

export default App;
