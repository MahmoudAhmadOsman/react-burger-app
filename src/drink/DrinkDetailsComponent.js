import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";
import "./DrinkStyle.css";

const DrinkDetailsComponent = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [drink, setDrink] = useState({
    name: "",
    drink_image: "",
    price: "",
    description: "",
    stars: 0,
  });
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  useEffect(() => {
    const loadDrinkData = async () => {
      try {
        const response = await BurgerService.getDrinkId(id);
        setDrink(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        toast.error(`Failed to load drink details: ${error.message}`, {
          position: "bottom-right",
        });
        setLoading(false);
      }
    };

    loadDrinkData();
  }, [id]);

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setCart([...cart, drink]);
    toast.success(`${drink.name} added to cart!`, {
      position: "bottom-right",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="mb-4">
            <i className="fa fa-spinner fa-spin fa-3x text-primary"></i>
          </div>
          <Loading />
          <p className="text-muted mt-3">Loading beverage details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card border-0 shadow-lg">
                <div className="card-body text-center p-5">
                  <i className="fa fa-exclamation-circle fa-4x text-danger mb-4"></i>
                  <h3 className="text-danger mb-3">Oops! Something went wrong</h3>
                  <p className="text-muted mb-4">{error.message}</p>
                  <div className="d-grid gap-2 d-md-block">
                    <Link to="/" className="btn btn-danger me-2">
                      <i className="fa fa-arrow-left me-2"></i>Back to Drinks
                    </Link>
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => window.location.reload()}
                    >
                      <i className="fa fa-refresh me-2"></i>Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderImage = () => {
    if (!drink.drink_image || !imageLoaded) {
      return (
        <div className="text-center py-5">
          <i className="fa fa-image fa-5x text-muted mb-3"></i>
          <p className="text-muted">No image available</p>
        </div>
      );
    }

    return (
      <img
        src={drink.drink_image}
        alt={drink.name}
        className="img-fluid rounded-3"
        style={{ maxHeight: "500px", objectFit: "cover" }}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    );
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container-fluid">
        {/* Enhanced Header with navigation */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">
                    <i className="fa fa-home me-1"></i>Drinks
                  </Link>
                </li>
                <li className="breadcrumb-item active">{drink.name}</li>
              </ol>
            </nav>
            <div className="mt-2">
              <Link to="/" className="btn btn-outline-primary me-3">
                <i className="fa fa-arrow-left me-2"></i>Back to Menu
              </Link>
              <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                <i className="fa fa-chevron-left me-1"></i>Previous
              </button>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end align-items-center">
              <div className="me-3">
                <small className="text-muted d-block">Your Cart</small>
                <CartItem cart={cart} />
              </div>
              <div className="vr me-3 d-none d-md-block"></div>
              <div className="text-center">
                <small className="text-muted d-block">Items in cart</small>
                <span className="badge bg-danger fs-6">{cart.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Product Display */}
        <div className="card border-0 shadow-lg overflow-hidden mb-5">
          <div className="row g-0">
            {/* Enhanced Image column */}
            <div className="col-lg-7 p-0 position-relative">
              <div className="h-100 bg-gradient-light d-flex align-items-center justify-content-center p-4 position-relative">
                
                {/* Premium Badge */}
                <div className="position-absolute top-0 start-0 m-3 z-3">
                  <div className="bg-warning text-dark px-3 py-2 rounded-pill shadow">
                    <i className="fa fa-star me-1"></i>
                    <small className="fw-bold">PREMIUM QUALITY</small>
                  </div>
                </div>

                {/* Image Display */}
                {drink.drink_image ? (
                  <div className="text-center">
                    <img
                      src={drink.drink_image}
                      alt={drink.name}
                      className="img-fluid rounded-4 shadow-lg drink-detail-image"
                      style={{ 
                        maxHeight: "600px", 
                        maxWidth: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease"
                      }}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    
                    {/* Image Actions */}
                    <div className="mt-3">
                      <button className="btn btn-light btn-sm me-2 shadow-sm">
                        <i className="fa fa-search-plus me-1"></i>Zoom
                      </button>
                      <button className="btn btn-light btn-sm shadow-sm">
                        <i className="fa fa-share me-1"></i>Share
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <div className="bg-white rounded-4 p-5 shadow-sm">
                      <i className="fa fa-image fa-5x text-muted mb-3"></i>
                      <p className="text-muted fs-5">No image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Details column */}
            <div className="col-lg-5 bg-white">
              <div className="p-4 p-lg-5 h-100 d-flex flex-column">
                
                {/* Product Header */}
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa fa-tint text-primary me-2"></i>
                    <small className="text-uppercase text-muted fw-bold tracking-wide">Premium Beverage</small>
                  </div>
                  
                  <h1 className="display-6 fw-bold text-dark mb-3 text-uppercase">
                    {drink.name}
                  </h1>
                  
                  {/* Rating & Reviews */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <RatingComponent rating={drink.stars} />
                      <span className="text-muted ms-2">({drink.stars}/5)</span>
                    </div>
                    <small className="text-muted">
                      <i className="fa fa-users me-1"></i>
                      Loved by customers
                    </small>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-4 p-3 bg-light rounded-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="text-danger mb-0 fw-bold">
                        <i className="fa fa-tag me-2"></i>${drink.price}
                      </h3>
                      <small className="text-muted">Free delivery on orders over $25</small>
                    </div>
                    <div className="col-auto">
                      <div className="text-center">
                        <i className="fa fa-truck fa-2x text-success mb-1"></i>
                        <p className="small text-muted mb-0">Fast Delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Description Section */}
                <div className="mb-4 flex-grow-1">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa fa-info-circle text-primary me-2 fs-5"></i>
                    <h4 className="text-dark mb-0">About This Drink</h4>
                  </div>
                  
                  <div className="bg-light rounded-3 p-3 mb-3">
                    <p className="mb-0 text-dark lh-lg">{drink.description}</p>
                  </div>

                  {/* Features */}
                  <div className="row g-2 text-center small">
                    <div className="col-3">
                      <div className="p-2 border rounded">
                        <i className="fa fa-leaf text-success d-block mb-1"></i>
                        <span className="text-muted">Natural</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="p-2 border rounded">
                        <i className="fa fa-snowflake-o text-info d-block mb-1"></i>
                        <span className="text-muted">Cold</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="p-2 border rounded">
                        <i className="fa fa-heart text-danger d-block mb-1"></i>
                        <span className="text-muted">Healthy</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="p-2 border rounded">
                        <i className="fa fa-bolt text-warning d-block mb-1"></i>
                        <span className="text-muted">Energy</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto">
                  <div className="d-grid gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-danger btn-lg fw-bold text-uppercase py-3 shadow"
                      style={{background: 'linear-gradient(135deg, #dc3545, #c82333)'}}
                    >
                      <i className="fa fa-shopping-cart me-2"></i>
                      Add to Cart - ${drink.price}
                    </button>
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <button className="btn btn-outline-primary btn-lg w-100">
                          <i className="fa fa-heart me-1"></i>
                          Favorite
                        </button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-outline-secondary btn-lg w-100">
                          <i className="fa fa-share-alt me-1"></i>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-3 border-top">
                    <div className="row text-center small text-muted">
                      <div className="col-4">
                        <i className="fa fa-shield fa-lg d-block mb-2"></i>
                        <span>Quality Guarantee</span>
                      </div>
                      <div className="col-4">
                        <i className="fa fa-refresh fa-lg d-block mb-2"></i>
                        <span>Easy Returns</span>
                      </div>
                      <div className="col-4">
                        <i className="fa fa-phone fa-lg d-block mb-2"></i>
                        <span>24/7 Support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body text-center p-4">
                <i className="fa fa-leaf fa-3x text-success mb-3"></i>
                <h5 className="card-title">Fresh Ingredients</h5>
                <p className="card-text text-muted">Made with the finest natural ingredients</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body text-center p-4">
                <i className="fa fa-truck fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Fast Delivery</h5>
                <p className="card-text text-muted">Quick and reliable delivery service</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body text-center p-4">
                <i className="fa fa-star fa-3x text-warning mb-3"></i>
                <h5 className="card-title">Customer Favorite</h5>
                <p className="card-text text-muted">Highly rated by our customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrinkDetailsComponent;
