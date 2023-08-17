import React, { useContext } from "react";
import { HomeContext } from "../../context/homeContext";

export const CartItem = ({ data }) => {
  const { _id, name, price, imageURL } = data;
  const { cartItems, addToCart, removeFromCart } = useContext(HomeContext);
  const quantityInCart = cartItems[_id] || 0;

  return (
    <div className="cartItem">
      <img src={imageURL} alt="" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>Rs.{price * quantityInCart}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(_id)}>-</button>
          <input value={quantityInCart} readOnly />
          <button onClick={() => addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  );
};
