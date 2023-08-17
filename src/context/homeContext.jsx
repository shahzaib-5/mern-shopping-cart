import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HomeContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (const product of products) {
    cart[product._id] = 0;
  }
  return cart;
};

export const HomeContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : getDefaultCart([]);
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/get"); // Update with your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      const quantity = cartItems[itemId];
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  };

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.children}
    </HomeContext.Provider>
  );
};
