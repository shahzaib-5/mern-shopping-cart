import React from "react";

const RecommendedProductModal = ({ product, onClose, onAddToCart, onIgnore }) => {
  return (
    <div className="recommended-product-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Recommended Product</h2>
        {product && (
          <div className="product">
            {/* Render recommended product details */}
            <img src={product.imageURL} alt="" />
            <div className="description">
              <p><b>{product.name}</b></p>
              <p>{product.description}</p>
              <p>Rs.{product.price}</p>
            </div>
            <div className="checkout">
            <button onClick={onAddToCart}>Add To Cart</button>
            <button onClick={onIgnore}>Ignore</button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedProductModal;
