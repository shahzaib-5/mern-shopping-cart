import React, { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../context/homeContext";
import { CartItem } from "./cartItem";
import axios from "axios";
import "./CartModal.css";

const CartModal = ({ closeModal }) => {
  const { cartItems, getTotalCartAmount } = useContext(HomeContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="cart-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Your Cart Items</h2>
        <div className="cart-items">
          {Object.entries(cartItems).map(([id, quantity]) => {
            const product = products.find((product) => product._id === id);
            return quantity > 0 && product ? (
              <CartItem key={id} data={product} />
            ) : null;
          })}
        </div>
        <div className="checkout">
          <p>SubTotal : Rs.{getTotalCartAmount()}</p>
          <button onClick={closeModal}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
