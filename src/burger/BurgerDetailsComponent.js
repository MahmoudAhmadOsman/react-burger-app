import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";

const BurgerDetailsComponent = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const [burger, setBurger] = useState({
    name: "",
    price: "",
    description: "",
    review: "",
    meal_img: "",
    calories: "",
    fiber: "",
    protein: "",
    carbs: "",
  });

  // Array of fallback burger images
  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
  ];

  const loadBurgerData = async () => {
    try {
      const response = await BurgerService.getBurgerId(id);
      setBurger({
        ...response.data,
        meal_img:
          response.data.meal_img ||
          FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)],
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.warn(`An Error ${error} has occurred!!`, {
        position: "bottom-right",
      });
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const updatedCart = [...cart, burger];
    setCart(updatedCart);
    toast.success(`${burger.name} added to cart!!`, {
      position: "bottom-right",
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    loadBurgerData();
  }, [id]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGES[0];
  };

  return (
    <section className="burger-details bg-light">
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <Link to="/burgers" className="btn btn-outline-danger btn-sm mb-3">
              <i className="fa fa-chevron-left me-2"></i> Back to Menu
            </Link>
            <h1 className="display-4 fw-bold text-danger mb-0">
              {burger.name} Details
            </h1>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end align-items-center">
              <div className="cart-items">
                <CartItem cart={cart} />
              </div>
            </div>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-5">
            <Loading />
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            <h5>{error.message}</h5>
          </div>
        )}

        {/* Burger Details Card */}
        {!loading && !error && (
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
              {/* Image Column */}
              <div className="col-lg-6 col-md-12">
                <div className="h-100 d-flex align-items-center justify-content-center p-4 bg-white">
                  {burger.meal_img ? (
                    <img
                      src={burger.meal_img}
                      alt={burger.name}
                      className="img-fluid rounded-3"
                      style={{ maxHeight: "500px", width: "auto" }}
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="text-center py-5">
                      <i className="fa fa-picture-o fa-5x text-muted mb-3"></i>
                      <p className="text-muted">Image not available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Column */}
              <div className="col-lg-6 col-md-12 bg-white">
                <div className="p-4 p-lg-5 h-100 d-flex flex-column">
                  <div className="mb-4">
                    <h1 className="fw-bold mb-3">{burger.name}</h1>
                    <div className="d-flex align-items-center mb-3">
                      <RatingComponent rating={burger.stars} />
                      <span className="ms-2 text-muted">
                        ({burger.review} reviews)
                      </span>
                    </div>
                    <h2 className="text-danger fw-bold mb-4">
                      ${burger.price}
                    </h2>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-muted mb-3">
                      <i className="fa fa-align-left me-2"></i>Description
                    </h4>
                    <p className="lead">{burger.description}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-muted mb-3">
                      <i className="fa fa-info-circle me-2"></i>Nutritional Info
                    </h4>
                    <div className="row g-3">
                      <div className="col-6 col-md-3">
                        <div className="bg-light p-3 rounded text-center">
                          <i className="fa fa-fire text-danger mb-2"></i>
                          <h6 className="mb-0">Calories</h6>
                          <p className="fw-bold mb-0">{burger.calories}</p>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="bg-light p-3 rounded text-center">
                          <i className="fa fa-leaf text-success mb-2"></i>
                          <h6 className="mb-0">Fiber</h6>
                          <p className="fw-bold mb-0">{burger.fiber}g</p>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="bg-light p-3 rounded text-center">
                          <i className="fa fa-bolt text-warning mb-2"></i>
                          <h6 className="mb-0">Protein</h6>
                          <p className="fw-bold mb-0">{burger.protein}g</p>
                        </div>
                      </div>
                      <div className="col-6 col-md-3">
                        <div className="bg-light p-3 rounded text-center">
                          <i className="fa fa-pie-chart text-info mb-2"></i>
                          <h6 className="mb-0">Carbs</h6>
                          <p className="fw-bold mb-0">{burger.carbs}g</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-3">
                    <button
                      onClick={addToCart}
                      className="btn btn-danger btn-lg w-100 py-3 fw-bold"
                    >
                      <i className="fa fa-cart-plus me-2"></i> ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BurgerDetailsComponent;
