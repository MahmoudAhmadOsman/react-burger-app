import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";

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
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h4>Error loading drink details</h4>
          <p>{error.message}</p>
          <Link to="/" className="btn btn-outline-danger mt-3">
            <i className="fa fa-arrow-left me-2"></i>Back to Drinks
          </Link>
        </div>
      </div>
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
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header with navigation */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/" className="btn btn-outline-danger">
            <i className="fa fa-arrow-left me-2"></i>Back to Drinks
          </Link>
          <div className="cart-items">
            <CartItem cart={cart} />
          </div>
        </div>

        {/* Main content */}
        <div className="card border-0 shadow-lg overflow-hidden">
          <div className="row g-0">
            {/* Image column */}
            <div className="col-lg-6 p-0">
              <div className="h-100 bg-white d-flex align-items-center justify-content-center p-4">
                {drink.drink_image ? (
                  <img
                    src={drink.drink_image}
                    alt={drink.name}
                    className="img-fluid rounded-3"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                ) : (
                  <div className="text-center py-5">
                    <i className="fa fa-image fa-5x text-muted mb-3"></i>
                    <p className="text-muted">No image available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details column */}
            <div className="col-lg-6 bg-white">
              <div className="p-4 p-lg-5 h-100 d-flex flex-column">
                <div className="mb-3">
                  <h1 className="display-5 fw-bold text-uppercase mb-3">
                    {drink.name}
                  </h1>
                  <div className="d-flex align-items-center mb-3 text-warning">
                    <RatingComponent rating={drink.stars} />
                  </div>
                  <h3 className="text-muted">Price:</h3>{" "}
                  <h5 className="text-danger mb-2">${drink.price}</h5>
                </div>
                <hr />

                <div className="mb-4 flex-grow-1">
                  <h4 className="text-muted mb-3">Description</h4>
                  <p className="lead">{drink.description}</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-danger btn-lg w-100 py-3 text-uppercase fw-bold"
                >
                  <i className="fa fa-shopping-cart me-2"></i>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrinkDetailsComponent;
