import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const deleteHandler = async (productId) => {
    try {
      await axios.delete(`/products/delete/${productId}`);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
      navigate("/admin");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/get");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate("/addproduct");
  };

  return (
    <div className="admin-btn">
      <button onClick={handleButtonClick}>Add Product</button>

      <div className="shop-admin">
        <div className="products-admin">
          {products.map((product) => (
            <div className="product-admin" key={product._id}>
              <img src={product.imageURL} className="image" alt="" />

              <div className="description-admin">
                <p>
                  <b>{product.name}</b>
                </p>
                <p>{product.description}</p>
                <p>Rs.{product.price}</p>
              </div>
              <div className="edit-btn">
                <button>
                  <Link to={`/admin/update/${product._id}`}  className="link-button">Edit Product</Link>
                </button>
              </div>
              <div className="delete-btn">
                <button onClick={() => deleteHandler(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
