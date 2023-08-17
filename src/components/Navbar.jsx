import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "../components/Navbar.css";
import { HomeContext } from "../context/homeContext";

const NavBar = ({ openCartModal, isLoggedIn, handleLogout }) => {
  const { cartItems } = useContext(HomeContext);

  const totalItemsInCart = Object.values(cartItems).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="navbar">
      <div className="links">
        {isLoggedIn && <Link to="/">Home</Link>}
        {isLoggedIn && (
          <>
            <div className="cart-badge" onClick={openCartModal}>
              <ShoppingCart size={28} />
              {totalItemsInCart > 0 && (
                <span className="cartCount">{totalItemsInCart}</span>
              )}
            </div>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/signin">SignIn</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
