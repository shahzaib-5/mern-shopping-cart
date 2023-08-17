import React, { useState } from "react";
import axios from "axios"
import {toast} from "react-hot-toast"
import {useNavigate} from 'react-router-dom'
import "./signup.css";

export const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "", 
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password} = data
    try {
      const {data} = await axios.post('./signup' , {
        name , email , password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success("Account Created Successfully")
        navigate('/signin')
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="register">
      {/* {console.log("Data", data)} */}
      <form className="signup" onSubmit={handleSubmit}>
        <h1>Register Yourself</h1>
        <input
          type="text"
          name="name"
          value={data.name}
          placeholder="Enter your Name"
          onChange={(e) => setData({...data , name : e.target.value})}
          required
        />
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Enter your Email"
          onChange={(e) => setData({...data , email : e.target.value})}
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Enter your Password"
          onChange={(e) => setData({...data , password : e.target.value})}
          required
        />
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
