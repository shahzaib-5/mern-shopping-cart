// import React, { useContext } from "react";
// import { HomeContext } from "../../context/homeContext";

// export const Product = (props) => {
  
//   const { id, productName, price, description, productImage } = props.data; //it is all the data that each product has
//   const { addToCart } = useContext(HomeContext);

//   return (
//     <div className="product">
//       <img src={productImage} alt="" />
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p>{description}</p>
//         <p> Rs.{price}</p>
//       </div>
//       <button
//         className="addToCartBttn"
//         onClick={() => {
//           addToCart(id);
//         }}
//       >
//         Add To Cart
//       </button>
//     </div>
//   );
// };
