import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import "./ShoppingCartStyle.css";

const ShoppingCartComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  // Placeholder image for fallback
  const placeholderImage = "https://via.placeholder.com/80x80?text=No+Image";

  const handleRemoveCartItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
    toast.error(`${item.name} removed from cart!!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      cart: cart,
      totalPrice: totalPrice,
      date: new Date().toISOString(),
    };

    fetch("https://stapes-api.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(`Order placed successfully!!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        setCart([]);
        localStorage.clear();
        navigate("/cart/shopping/orders");
      })
      .catch((error) => {
        toast.warn(`Error placing order: ${error.message}`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price || 0),
    0
  );

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCart(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Function to get the correct image URL for an item
  const getItemImage = (item) => {
    if (item.meal_img) return item.meal_img;
    if (item.drink_image) return item.drink_image;
    return placeholderImage;
  };

  // Function to get the correct link for an item
  const getItemLink = (item) => {
    if (item.meal_img) return `/view-burger/${item.id}`;
    if (item.drink_image) return `/view-drink/${item.id}`;
    return "#";
  };

  return (
    <section className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <Loading />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">
          <h5>{error.message}</h5>
        </div>
      ) : (
        <div className="container">
          {cart.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center py-5">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <i className="fa fa-shopping-cart fa-5x text-muted mb-4"></i>
                    <h2 className="text-danger mb-3">Your cart is empty!</h2>
                    <p className="lead mb-4">
                      Looks like you haven't added any items to your cart yet.
                    </p>
                    <Link to="/burgers" className="btn btn-primary btn-lg">
                      <i className="fa fa-arrow-left me-2"></i> Continue
                      Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h2 text-success mb-0">
                  <i className="fa fa-shopping-cart me-2"></i> Shopping Cart
                </h1>
                <Link to="/burgers" className="btn btn-outline-primary">
                  <i className="fa fa-chevron-left me-2"></i> Continue Shopping
                </Link>
              </div>

              <div className="row">
                <div className="col-lg-8">
                  <div className="card shadow-sm mb-4">
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th style={{ width: "120px" }}>Item</th>
                              <th>Product</th>
                              <th>Price</th>
                              <th style={{ width: "100px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item) => (
                              <tr key={item.id}>
                                <td>
                                  <Link to={getItemLink(item)}>
                                    <img
                                      src={getItemImage(item)}
                                      alt={item.name}
                                      className="img-fluid rounded"
                                      style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                      }}
                                      onError={(e) => {
                                        e.target.src = placeholderImage;
                                      }}
                                    />
                                  </Link>
                                </td>
                                <td>
                                  <h5 className="mb-1">{item.name}</h5>
                                  <p className="small text-muted mb-0">
                                    {item.description
                                      ? `${item.description.slice(0, 60)}...`
                                      : "No description available"}
                                  </p>
                                </td>
                                <td>
                                  <span className="fw-bold text-danger">
                                    ${parseFloat(item.price || 0).toFixed(2)}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    onClick={() => handleRemoveCartItem(item)}
                                    className="btn btn-outline-danger btn-sm"
                                    title="Remove item"
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h4 className="card-title mb-4">
                        <i className="fa fa-receipt me-2"></i> Order Summary
                      </h4>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Shipping</span>
                        <span className="text-success">Free</span>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between mb-4">
                        <span className="fw-bold">Total</span>
                        <span className="fw-bold text-danger h5">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={handlePlaceOrder}
                        className="btn btn-warning btn-lg w-100 py-3"
                        disabled={cart.length === 0}
                      >
                        <i className="fa fa-check-circle me-2"></i> Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ShoppingCartComponent;
