import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./signin.css";

export const Signin = ({ handleLogin, setUserId }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post("/signin", {
        email,
        password,
      });
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        handleLogin(responseData.user, responseData.token);
        setUserId(responseData.user._id);
        setData({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <form className="signup" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          value={data.email}
          placeholder="Enter your Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="Enter your Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type="submit" className="register-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
