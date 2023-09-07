import React, { useContext, useState, useEffect } from "react";
import { HomeContext } from "../../context/homeContext";
import { CartItem } from "./cartItem";
import axios from "axios";
import "./CartModal.css";

const CartModal = ({ closeModal, userId }) => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(HomeContext);
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

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

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      const addedProductIds = Object.keys(cartItems).filter(
        (id) => cartItems[id] > 0
      );
      const cartProductCategories = addedProductIds.map(
        (productId) =>
          products.find((product) => product._id === productId)?.category
      );

      // Get recommendations based on cart product categories
      const recommendedProducts = products.filter(
        (product) =>
          cartProductCategories.includes(product.category) &&
          !addedProductIds.includes(product._id)
      );

      setRecommendations(recommendedProducts);
      setShowRecommendations(true);
    }
  }, [cartItems, products]);

  const checkout = async () => {
    try {
      const addedProductIds = Object.keys(cartItems).filter(
        (id) => cartItems[id] > 0
      );
      const checkoutData = addedProductIds.map((productId) => ({
        product: productId,
        quantity: cartItems[productId],
      }));

      const response = await axios.post("/cart/add-to-cart", {
        userId: userId,
        products: checkoutData,
      });

      clearCart();
      console.log(response.data.message);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="cart-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>{" "}
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
          <p>SubTotal: Rs.{getTotalCartAmount()}</p>
          <button onClick={closeModal}>Continue Shopping</button>
          <button onClick={checkout}>Checkout</button>
        </div>
      </div>
      {recommendations.length > 0 && showRecommendations && (
        <div className="recommendation-modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowRecommendations(false)}
            >
              &times;
            </span>
            <h2>Recommended Products</h2>
            <div className="cart-items">
              {recommendations.map((product) => (
                <CartItem key={product._id} data={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;





























// import React, { useContext, useState, useEffect } from "react";
// import { HomeContext } from "../../context/homeContext";
// import { CartItem } from "./cartItem";
// import axios from "axios";
// import "./CartModal.css";

// const CartModal = ({ closeModal, userId  }) => {
//   const { cartItems, getTotalCartAmount ,  clearCart } = useContext(HomeContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/products/get");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const checkout = async () => {
//     try {
//       // console.log("Checkout request payload:", { userId, cartItems });
//       const addedProductIds = Object.keys(cartItems).filter((id) => cartItems[id] > 0);
//       const checkoutData = addedProductIds.map((productId) => ({
//         product: productId,
//         quantity: cartItems[productId],
//       }));

//       const response = await axios.post("/cart/add-to-cart", {
//         userId: userId,
//         products: checkoutData,
//       });

//       clearCart();
//       console.log(response.data.message);
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="cart-modal">
//       <div className="modal-content">
//         <span className="close" onClick={closeModal}>
//           &times;
//         </span>
//         <h2>Your Cart Items</h2>
//         <div className="cart-items">
//           {Object.entries(cartItems).map(([id, quantity]) => {
//             const product = products.find((product) => product._id === id);
//             return quantity > 0 && product ? (
//               <CartItem key={id} data={product} />
//             ) : null;
//           })}
//         </div>
//         <div className="checkout">
//           <p>SubTotal: Rs.{getTotalCartAmount()}</p>
//           <button onClick={closeModal}>Continue Shopping</button>
//           <button onClick={checkout}>Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartModal;

// import React, { useContext, useEffect, useState } from "react";
// import { HomeContext } from "../../context/homeContext";
// import { CartItem } from "./cartItem";
// import axios from "axios";
// import "./CartModal.css";
// import RecommendedProductModal from "./RecommendedProductModal"; // Update path

// const CartModal = ({ closeModal }) => {
//   const { cartItems, getTotalCartAmount, addToCart } = useContext(HomeContext);
//   const [products, setProducts] = useState([]);
//   const [recommendedProduct, setRecommendedProduct] = useState(null);
//   const [showRecommendedModal, setShowRecommendedModal] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/products/get");
//         setProducts(response.data);
//         if (response.data.length > 0 && recommendedProduct === null) {
//           const randomIndex = Math.floor(Math.random() * response.data.length);
//           setRecommendedProduct(response.data[randomIndex]);
//           setShowRecommendedModal(true); // Show the recommended product modal
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchData();
//   }, [recommendedProduct]); // Fetch data only when recommendedProduct changes

//   const handleAddToCart = (productId) => {
//     addToCart(productId);
//     setShowRecommendedModal(false); // Close the recommended product modal
//   };

//   const handleIgnoreRecommendation = () => {
//     setShowRecommendedModal(false); // Close the recommended product modal
//   };

//   return (
//     <div className="cart-modal">
//       <div className="modal-content">
//         <span className="close" onClick={closeModal}>
//           &times;
//         </span>
//         <h2>Your Cart Items</h2>
//         <div className="cart-items">
//           {Object.entries(cartItems).map(([id, quantity]) => {
//             const product = products.find((product) => product._id === id);
//             return quantity > 0 && product ? (
//               <CartItem key={id} data={product} />
//             ) : null;
//           })}
//         </div>
//         {recommendedProduct && showRecommendedModal && (
//           <RecommendedProductModal
//             product={recommendedProduct}
//             onClose={() => setShowRecommendedModal(false)}
//             onAddToCart={() => handleAddToCart(recommendedProduct._id)}
//             onIgnore={handleIgnoreRecommendation}
//           />
//         )}
//         <div className="checkout">
//           <p>SubTotal : Rs.{getTotalCartAmount()}</p>
//           <button onClick={closeModal}>Continue Shopping</button>
//           <button>Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartModal;
