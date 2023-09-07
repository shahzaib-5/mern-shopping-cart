import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../home/home.css";
import { HomeContext } from "../../context/homeContext";

const Home = () => {
  const { addToCart } = useContext(HomeContext);
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line
  // const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/products/get");
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      fetchData();
    }, []);

  // const handleCategoryChange = (category) => {
  //     setSelectedCategory(category);
  // };

  // const handleAllProducts = () => {
  //     setSelectedCategory(''); // Reset to an empty category to fetch all products
  // };

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>E-Commerce Store</h1>
      </div>
      {/* <div className="categoryButtons"> */}
      {/* <button onClick={() => handleCategoryChange('phones')}>Phones</button>
                <button onClick={() => handleCategoryChange('watches')}>Watches</button> */}
      {/* Add more buttons for other categories */}
      {/* <button onClick={handleAllProducts}>All Products</button> */}

      {/* </div> */}
      <div className="products">
        {products.map((product) => (
          <div className="product" key={product._id}>
            <img src={product.imageURL} className="image" alt="" />
            <div className="description">
              <p>
                <b>{product.name}</b>
              </p>
              <p>{product.description}</p>
              <p> Rs.{product.price}</p>
            </div>
            <button
              className="addToCartBttn"
              onClick={() => {
                addToCart(product._id);
              }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


// import React, { useEffect, useState, useContext } from "react";
//   import axios from 'axios'
//   import "../home/home.css";
//   import { HomeContext } from "../../context/homeContext";

//   const Home = () => {
//     const { addToCart } = useContext(HomeContext);
//     const [products, setProducts] = useState([]); // Initialize state as an empty array

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get("/products/get");
//           setProducts(response.data);
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         }
//       }
//       fetchData();
//     }, []);

//     return (
//       <div className="shop">
//         <div className="shopTitle">
//           <h1>E-Commerce Store</h1>
//         </div>

//         <div className="products">
//           {products.map((product) => (
//             <div className="product" key={product._id}>
//               <img src={product.imageURL} className="image" alt="" />
//               <div className="description">
//                 <p>
//                   <b>{product.name}</b>
//                 </p>
//                 <p>{product.description}</p>
//                 <p> Rs.{product.price}</p>
//               </div>
//               <button
//                 className="addToCartBttn"
//                 onClick={() => {
//                   addToCart(product._id);
//                 }}
//               >
//                 Add To Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default Home;
