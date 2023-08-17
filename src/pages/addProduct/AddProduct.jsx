import React, { useState } from "react";
import axios from 'axios'
import "./AddProduct.css";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const addProduct = (e)=>{
    e.preventDefault();
  axios.post('/products/add', {
    name,
    imageURL,
    description,
    price
  }).then(()=>{
    setName("");
    setImageURL("");
    setDescription("");
    setPrice(0);
  }).catch((error)=>
  alert(error.message)
  )
  }
  return (
    <div className="add-product">
      <form className="products-fields">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          type="text"
          placeholder="Enter Image URL"
          onChange={(e) => setImageURL(e.target.value)}
          value={imageURL}
          required
        />
        <input
          type="text"
          placeholder="Enter Product Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <input
          type="number"
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
        <button type="submit" className="register-button" onClick={addProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
