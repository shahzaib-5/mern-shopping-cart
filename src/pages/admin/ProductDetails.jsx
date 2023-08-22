import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/get/${id}`);
        setProduct(response.data); // Populate the state with existing product data
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/products/update/${id}`, product);
      // Redirect to the admin page after successful update
      window.location.href = "/admin";
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit} className="products-fields">
        <h1>Update Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Image URL"
          name="imageURL"
          value={product.imageURL}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          placeholder="Enter Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="register-button">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default ProductDetails;
