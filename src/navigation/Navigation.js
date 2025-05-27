import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./NavigationStyle.css";

const Navigation = () => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });
  const [cartCount, setCartCount] = useState(cart.length);

  useEffect(() => {
    fetch("https://stapes-api.onrender.com/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => {
        toast.warn(`An Error ${error} has occurred!!`, {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error fetching orders:", error.message);
      });
  }, []);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          {/* Brand/Logo with improved styling */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            VAST BURGERS
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item mx-2">
                <Link className="nav-link position-relative" to="/">
                  Home
                  <span
                    className="position-absolute bottom-0 start-50 w-0 h-1 bg-primary transition-all"
                    style={{ transform: "translateX(-50%)" }}
                  ></span>
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link className="nav-link position-relative" to="/burgers">
                  Burgers
                  <span
                    className="position-absolute bottom-0 start-50 w-0 h-1 bg-primary transition-all"
                    style={{ transform: "translateX(-50%)" }}
                  ></span>
                </Link>
              </li>

              {orders.length > 0 && (
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link position-relative"
                    to="/cart/shopping/orders"
                  >
                    Orders
                    <span
                      className="position-absolute bottom-0 start-50 w-0 h-1 bg-primary transition-all"
                      style={{ transform: "translateX(-50%)" }}
                    ></span>
                  </Link>
                </li>
              )}

              {/* Shopping Cart with improved styling */}
              {cartCount > 0 && (
                <li className="nav-item ms-3">
                  <Link className="nav-link" to="/shopping/shopping-cart">
                    <button
                      type="button"
                      className="btn btn-outline-light position-relative rounded-pill px-3 py-2"
                    >
                      <i
                        className="fa fa-shopping-cart fa-lg"
                        aria-hidden="true"
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartCount}
                        <span className="visually-hidden">items in cart</span>
                      </span>
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
