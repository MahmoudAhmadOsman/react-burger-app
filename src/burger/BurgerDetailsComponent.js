import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";
import "./BurgerStyle.css";

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
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
    <section className="burger-details-page">
      <div className="container px-4 py-3">
        {/* Navigation Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <div className="breadcrumb-container glass-effect rounded-pill px-4 py-2 d-inline-flex">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/burgers" className="text-decoration-none text-muted">
                  <i className="fa fa-home me-2"></i>Menu
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-danger fw-medium"
                aria-current="page"
              >
                {burger.name || "Burger Details"}
              </li>
            </ol>
          </div>
        </nav>

        {/* Header Section */}
        <div className="details-header mb-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="header-content">
                <Link
                  to="/burgers"
                  className="back-button btn btn-outline-light border-0 mb-3"
                >
                  <i className="fa fa-arrow-left me-2"></i>
                  <span className="d-none d-sm-inline">Back to Menu</span>
                </Link>
                <div className="title-section">
                  <h1 className="details-title display-4 fw-bold mb-2">
                    {burger.name && (
                      <>
                        <span className="text-dark">{burger.name}</span>
                        <span className="text-danger ms-2">Details</span>
                      </>
                    )}
                  </h1>
                  <p className="lead text-muted mb-0">
                    <i className="fa fa-utensils text-danger me-2"></i>
                    Discover the perfect blend of taste and nutrition
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="header-actions d-flex justify-content-lg-end justify-content-start">
                <div className="cart-widget glass-effect rounded-pill px-3 py-2">
                  <CartItem cart={cart} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="loading-state text-center py-5">
            <div className="loading-content glass-effect rounded-4 p-5 d-inline-block">
              <Loading />
              <p className="text-muted mt-3 mb-0">
                Loading delicious details...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="error-state text-center py-5">
            <div className="error-content glass-effect rounded-4 p-5 max-width-500 mx-auto">
              <div className="error-icon mb-4">
                <i className="fa fa-exclamation-triangle fa-3x text-danger"></i>
              </div>
              <h4 className="text-dark mb-3">Oops! Something went wrong</h4>
              <p className="text-muted mb-4">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-danger px-4 py-2"
              >
                <i className="fa fa-refresh me-2"></i>Try Again
              </button>
            </div>
          </div>
        )}

        {/* Burger Details Main Card */}
        {!loading && !error && (
          <div className="burger-details-card">
            <div className="row g-4">
              {/* Image Section */}
              <div className="col-xl-6 col-lg-6">
                <div className="image-section">
                  <div className="image-container position-relative">
                    {burger.meal_img ? (
                      <>
                        <img
                          src={burger.meal_img}
                          alt={burger.name}
                          className="burger-details-image img-fluid"
                          onError={handleImageError}
                        />
                        <div className="image-overlay position-absolute top-0 start-0 w-100 h-100">
                          <div className="overlay-content d-flex align-items-center justify-content-center">
                            <div className="image-actions">
                              <button
                                className="btn btn-white rounded-circle me-2"
                                title="Zoom"
                              >
                                <i className="fa fa-search-plus"></i>
                              </button>
                              <button
                                className="btn btn-white rounded-circle"
                                title="Favorite"
                              >
                                <i className="fa fa-heart-o"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="image-badge position-absolute top-0 end-0 m-3">
                          <span className="badge bg-gradient-danger text-white rounded-pill px-3 py-2 fw-bold">
                            <i className="fa fa-fire me-1"></i>Premium
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="image-placeholder d-flex align-items-center justify-content-center">
                        <div className="text-center">
                          <div className="placeholder-icon mb-3">
                            <i className="fa fa-picture-o fa-4x text-muted"></i>
                          </div>
                          <h6 className="text-muted mb-2">
                            Image not available
                          </h6>
                          <p className="text-muted small mb-0">
                            We're working on it!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="col-xl-6 col-lg-6">
                <div className="details-section">
                  <div className="details-content glass-effect rounded-4 p-4 h-100">
                    {/* Burger Info Header */}
                    <div className="burger-info-header mb-4">
                      <div className="title-wrapper mb-3">
                        <h1 className="burger-details-title fw-bold text-dark mb-2">
                          {burger.name}
                        </h1>
                        <div className="rating-wrapper d-flex align-items-center mb-3">
                          <div className="rating-stars me-3">
                            <RatingComponent rating={burger.stars} />
                          </div>
                          <div className="rating-info">
                            <span className="reviews-count fw-medium text-muted">
                              ({burger.review} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="price-section">
                        <div className="price-wrapper bg-light rounded-3 p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="price-label">
                              <span className="text-muted fw-medium">
                                Price
                              </span>
                            </div>
                            <div className="price-value">
                              <h3 className="text-danger fw-bold mb-0">
                                <i className="fa fa-dollar me-1"></i>
                                {burger.price}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="section-divider mb-4">
                      <hr className="border-2" />
                    </div>

                    {/* Description Section */}
                    <div className="description-section mb-4">
                      <div className="section-header mb-3">
                        <h4 className="section-title text-dark fw-bold mb-0">
                          <i className="fa fa-align-left text-danger me-2"></i>
                          Description
                        </h4>
                      </div>
                      <div className="description-content">
                        <p className="description-text text-muted lh-lg">
                          {burger.description}
                        </p>
                      </div>
                    </div>

                    {/* Nutritional Analytics Panel */}
                    <div className="nutritional-analytics-panel mb-4">
                      <div className="analytics-header text-center mb-4">
                        <div className="header-icon mb-3">
                          <div
                            className="icon-circle bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                            style={{ width: "60px", height: "60px" }}
                          >
                            <i className="fa fa-line-chart fa-2x"></i>
                          </div>
                        </div>
                        <h4 className="analytics-title fw-bold text-dark mb-2">
                          Nutritional Analysis
                        </h4>
                        <p className="analytics-subtitle text-muted mb-0">
                          Complete breakdown of nutrients and health impact
                        </p>
                      </div>

                      {/* Main Nutrition Cards Grid */}
                      <div className="nutrition-cards-grid mb-4">
                        <div className="row g-3">
                          {/* Calories Card */}
                          <div className="col-lg-6 col-12">
                            <div className="nutrition-mega-card bg-white border-0 shadow-sm rounded-4 p-4 h-100">
                              <div className="card-header-custom d-flex align-items-center justify-content-between mb-3">
                                <div className="metric-info">
                                  <h5 className="metric-title text-dark fw-bold mb-1">
                                    Energy Content
                                  </h5>
                                  <p className="metric-subtitle text-muted small mb-0">
                                    Total Calories
                                  </p>
                                </div>
                                <div className="metric-icon">
                                  <div className="icon-wrapper bg-danger bg-opacity-10 rounded-3 p-3">
                                    <i className="fa fa-fire fa-2x text-danger"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="metric-display">
                                <div className="metric-number d-flex align-items-end mb-3">
                                  <span className="display-4 fw-bold text-danger me-2">
                                    {burger.calories}
                                  </span>
                                  <span className="fs-5 text-muted fw-medium mb-2">
                                    kcal
                                  </span>
                                </div>
                                <div className="metric-context">
                                  <div
                                    className="daily-value-bar bg-light rounded-pill overflow-hidden mb-2"
                                    style={{ height: "8px" }}
                                  >
                                    <div
                                      className="daily-value-fill bg-danger h-100 rounded-pill"
                                      style={{
                                        width: `${Math.min(
                                          (burger.calories / 2000) * 100,
                                          100
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="d-flex justify-content-between small text-muted">
                                    <span>
                                      {Math.round(
                                        (burger.calories / 2000) * 100
                                      )}
                                      % Daily Value
                                    </span>
                                    <span>Based on 2000 cal diet</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Macronutrients Summary Card */}
                          <div className="col-lg-6 col-12">
                            <div className="nutrition-mega-card bg-white border-0 shadow-sm rounded-4 p-4 h-100">
                              <div className="card-header-custom mb-3">
                                <h5 className="metric-title text-dark fw-bold mb-1">
                                  Macronutrients
                                </h5>
                                <p className="metric-subtitle text-muted small mb-0">
                                  Essential nutrients breakdown
                                </p>
                              </div>

                              <div className="macros-circular-display">
                                <div className="row g-3">
                                  <div className="col-4">
                                    <div className="macro-circle-item text-center">
                                      <div
                                        className="circular-progress position-relative mb-2 mx-auto"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                        }}
                                      >
                                        <svg
                                          width="60"
                                          height="60"
                                          className="rotate-270"
                                        >
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                            fill="none"
                                          />
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#ffc107"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${Math.min(
                                              (burger.protein / 50) * 157,
                                              157
                                            )} 157`}
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                        <div className="circle-content position-absolute top-50 start-50 translate-middle">
                                          <i className="fa fa-bolt text-warning small"></i>
                                        </div>
                                      </div>
                                      <div className="macro-details">
                                        <div className="macro-value fw-bold text-warning">
                                          {burger.protein}g
                                        </div>
                                        <div className="macro-label small text-muted">
                                          Protein
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-4">
                                    <div className="macro-circle-item text-center">
                                      <div
                                        className="circular-progress position-relative mb-2 mx-auto"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                        }}
                                      >
                                        <svg
                                          width="60"
                                          height="60"
                                          className="rotate-270"
                                        >
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                            fill="none"
                                          />
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#17a2b8"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${Math.min(
                                              (burger.carbs / 100) * 157,
                                              157
                                            )} 157`}
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                        <div className="circle-content position-absolute top-50 start-50 translate-middle">
                                          <i className="fa fa-wheat text-info small"></i>
                                        </div>
                                      </div>
                                      <div className="macro-details">
                                        <div className="macro-value fw-bold text-info">
                                          {burger.carbs}g
                                        </div>
                                        <div className="macro-label small text-muted">
                                          Carbs
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-4">
                                    <div className="macro-circle-item text-center">
                                      <div
                                        className="circular-progress position-relative mb-2 mx-auto"
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                        }}
                                      >
                                        <svg
                                          width="60"
                                          height="60"
                                          className="rotate-270"
                                        >
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#e9ecef"
                                            strokeWidth="4"
                                            fill="none"
                                          />
                                          <circle
                                            cx="30"
                                            cy="30"
                                            r="25"
                                            stroke="#28a745"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${Math.min(
                                              (burger.fiber / 25) * 157,
                                              157
                                            )} 157`}
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                        <div className="circle-content position-absolute top-50 start-50 translate-middle">
                                          <i className="fa fa-leaf text-success small"></i>
                                        </div>
                                      </div>
                                      <div className="macro-details">
                                        <div className="macro-value fw-bold text-success">
                                          {burger.fiber}g
                                        </div>
                                        <div className="macro-label small text-muted">
                                          Fiber
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Nutrition Table */}
                      <div className="nutrition-details-table">
                        <div className="table-card bg-white border-0 shadow-sm rounded-4 overflow-hidden">
                          <div className="table-header bg-light px-4 py-3 border-bottom">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h6 className="table-title fw-bold text-dark mb-1">
                                  <i className="fa fa-table text-primary me-2"></i>
                                  Detailed Nutrition Facts
                                </h6>
                                <p className="table-subtitle text-muted small mb-0">
                                  Per serving values and daily recommendations
                                </p>
                              </div>
                              <div className="nutrition-score">
                                <span className="badge bg-success rounded-pill px-3 py-2 fw-medium">
                                  <i className="fa fa-star me-1"></i>
                                  Nutrition Score: A+
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="table-responsive">
                            <table className="table table-hover mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th className="border-0 fw-semibold text-dark ps-4">
                                    Nutrient
                                  </th>
                                  <th className="border-0 fw-semibold text-dark text-center">
                                    Amount
                                  </th>
                                  <th className="border-0 fw-semibold text-dark text-center">
                                    % Daily Value*
                                  </th>
                                  <th className="border-0 fw-semibold text-dark text-center pe-4">
                                    Health Impact
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="nutrition-row">
                                  <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                      <div className="nutrient-icon bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="fa fa-fire text-danger"></i>
                                      </div>
                                      <div>
                                        <div className="nutrient-name fw-medium text-dark">
                                          Calories
                                        </div>
                                        <div className="nutrient-desc small text-muted">
                                          Energy from food
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center fw-bold text-danger">
                                    {burger.calories} kcal
                                  </td>
                                  <td className="text-center">
                                    <div className="percentage-display">
                                      <span className="fw-medium">
                                        {Math.round(
                                          (burger.calories / 2000) * 100
                                        )}
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center pe-4">
                                    <span className="health-indicator badge bg-warning bg-opacity-20 text-dark rounded-pill">
                                      Moderate
                                    </span>
                                  </td>
                                </tr>

                                <tr className="nutrition-row">
                                  <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                      <div className="nutrient-icon bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="fa fa-bolt text-warning"></i>
                                      </div>
                                      <div>
                                        <div className="nutrient-name fw-medium text-dark">
                                          Protein
                                        </div>
                                        <div className="nutrient-desc small text-muted">
                                          Muscle building
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center fw-bold text-warning">
                                    {burger.protein}g
                                  </td>
                                  <td className="text-center">
                                    <div className="percentage-display">
                                      <span className="fw-medium">
                                        {Math.round(
                                          (burger.protein / 50) * 100
                                        )}
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center pe-4">
                                    <span className="health-indicator badge bg-success bg-opacity-20 text-dark rounded-pill">
                                      Excellent
                                    </span>
                                  </td>
                                </tr>

                                <tr className="nutrition-row">
                                  <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                      <div className="nutrient-icon bg-info bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="fa fa-pie-chart text-info"></i>
                                      </div>
                                      <div>
                                        <div className="nutrient-name fw-medium text-dark">
                                          Carbohydrates
                                        </div>
                                        <div className="nutrient-desc small text-muted">
                                          Quick energy
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center fw-bold text-info">
                                    {burger.carbs}g
                                  </td>
                                  <td className="text-center">
                                    <div className="percentage-display">
                                      <span className="fw-medium">
                                        {Math.round((burger.carbs / 300) * 100)}
                                        %
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center pe-4">
                                    <span className="health-indicator badge bg-info bg-opacity-20 text-dark rounded-pill">
                                      Good
                                    </span>
                                  </td>
                                </tr>

                                <tr className="nutrition-row">
                                  <td className="ps-4">
                                    <div className="d-flex align-items-center">
                                      <div className="nutrient-icon bg-success bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="fa fa-leaf text-success"></i>
                                      </div>
                                      <div>
                                        <div className="nutrient-name fw-medium text-dark">
                                          Dietary Fiber
                                        </div>
                                        <div className="nutrient-desc small text-muted">
                                          Digestive health
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center fw-bold text-success">
                                    {burger.fiber}g
                                  </td>
                                  <td className="text-center">
                                    <div className="percentage-display">
                                      <span className="fw-medium">
                                        {Math.round((burger.fiber / 25) * 100)}%
                                      </span>
                                    </div>
                                  </td>
                                  <td className="text-center pe-4">
                                    <span className="health-indicator badge bg-success bg-opacity-20 text-dark rounded-pill">
                                      Excellent
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="table-footer bg-light px-4 py-3 border-top">
                            <div className="footer-note text-center">
                              <p className="small text-muted mb-1">
                                <i className="fa fa-info-circle me-1"></i>
                                *Percent Daily Values are based on a 2,000
                                calorie diet
                              </p>
                              <div className="health-summary d-flex justify-content-center gap-3 flex-wrap">
                                <span className="summary-item small">
                                  <i className="fa fa-heart text-danger me-1"></i>
                                  Heart Friendly
                                </span>
                                <span className="summary-item small">
                                  <i className="fa fa-leaf text-success me-1"></i>
                                  High Fiber
                                </span>
                                <span className="summary-item small">
                                  <i className="fa fa-bolt text-warning me-1"></i>
                                  Protein Rich
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="action-section mt-auto pt-4">
                      <div className="add-to-cart-wrapper">
                        <button
                          onClick={addToCart}
                          className="add-to-cart-btn btn btn-lg w-100 py-3 fw-bold position-relative overflow-hidden"
                        >
                          <span className="btn-content d-flex align-items-center justify-content-center">
                            <i className="fa fa-shopping-cart me-3"></i>
                            <span className="btn-text">ADD TO CART</span>
                          </span>
                        </button>
                        <div className="action-info mt-3 text-center">
                          <div className="delivery-info d-flex justify-content-center align-items-center text-muted">
                            <div className="delivery-item me-4">
                              <i className="fa fa-truck text-success me-1"></i>
                              <span className="small">Free Delivery</span>
                            </div>
                            <div className="delivery-item">
                              <i className="fa fa-clock-o text-warning me-1"></i>
                              <span className="small">15-30 mins</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
