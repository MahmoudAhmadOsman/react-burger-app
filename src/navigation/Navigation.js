import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./NavigationStyle.css";

const Navigation = () => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });
  const [cartCount, setCartCount] = useState(cart.length);
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky-top nav-shadow">
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient py-3">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            {/* <i className="fa fa-cutlery me-3 text-warning fs-4" aria-hidden="true"></i> */}
            <span className="fw-bold fs-3 text-brand">VAST BURGERS</span>
          </Link>

          <button
            className="navbar-toggler border-0 p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-custom">
              <i className="fa fa-bars text-white fs-5"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link nav-link-modern d-flex align-items-center ${isActive('/') ? 'active' : ''}`} 
                  to="/"
                >
                  {/* <i className="fa fa-home me-2" aria-hidden="true"></i> */}
                  <span>Home</span>
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link nav-link-modern d-flex align-items-center ${isActive('/burgers') ? 'active' : ''}`} 
                  to="/burgers"
                >
                  {/* <i className="fa fa-birthday-cake me-2" aria-hidden="true"></i> */}
                  <span>Burgers</span>
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link 
                  className={`nav-link nav-link-modern d-flex align-items-center ${isActive('/drinks') ? 'active' : ''}`} 
                  to="/drinks"
                >
                  {/* <i className="fa fa-glass me-2" aria-hidden="true"></i> */}
                  <span>Drinks</span>
                </Link>
              </li>

              {orders.length > 0 && (
                <li className="nav-item mx-2">
                  <Link
                    className={`nav-link nav-link-modern d-flex align-items-center position-relative ${isActive('/cart/shopping/orders') ? 'active' : ''}`}
                    to="/cart/shopping/orders"
                  >
                    <i className="fa fa-list-alt me-2" aria-hidden="true"></i>
                    <span>Orders</span>
                    <span className="badge bg-info text-dark ms-2 orders-badge">
                      {orders.length}
                    </span>
                  </Link>
                </li>
              )}

              {cartCount > 0 && (
                <li className="nav-item ms-3">
                  <Link className="nav-link p-0" to="/shopping/shopping-cart">
                    <button
                      type="button"
                      className="btn btn-cart position-relative d-flex align-items-center"
                    >
                      <i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>
                      <span className="d-none d-md-inline">Cart</span>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark cart-badge">
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
