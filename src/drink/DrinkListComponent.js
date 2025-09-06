import React from "react";
import { useState, useEffect } from "react";
import BurgerService from "../service/BurgerService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import "./DrinkStyle.css";

const DrinkListComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedDrinkId, setExpandedDrinkId] = useState(null);

  const toggleDrinkDescription = (drinkId) => {
    setExpandedDrinkId(drinkId === expandedDrinkId ? null : drinkId);
  };

  const itemsPerPage = 4;

  const getAllDrinks = async () => {
    try {
      await BurgerService.getAllDrinks()
        .then((res) => {
          // Ensure all drinks have proper image URLs
          const drinksWithImages = res.data.map((drink) => ({
            ...drink,
            drink_image: drink.drink_image || getDefaultDrinkImage(drink.id),
          }));
          setDrinks(drinksWithImages);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          toast.warn(`An Error ${error} has occurred!!`, {
            position: "bottom-right",
          });
        });
    } catch (error) {
      toast.warn(`An Error ${error} has occurred!!`, {
        position: "bottom-right",
      });
    }
  };

  // Function to get default drink images based on ID
  const getDefaultDrinkImage = (id) => {
    const defaultImages = [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1438522014717-d7ce32b9bab9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    ];
    return defaultImages[id % defaultImages.length];
  };

  // Improved image error handler
  const handleImageError = (e, drinkId) => {
    e.target.src = getDefaultDrinkImage(drinkId);
    e.target.alt = "Default beverage image";
    e.target.className = "card-img-top img-fluid drink-image";
  };

  useEffect(() => {
    getAllDrinks();
  }, []);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentDrinks = drinks.slice(firstIndex, lastIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="drink-section py-5 bg-light">
      <div className="container-fluid">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
              <Loading />
              <p className="text-muted mt-3">Loading refreshing beverages...</p>
            </div>
          </div>
        ) : error ? (
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-danger text-center shadow-sm border-0">
                <i className="fa fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4 className="alert-heading">Oops! Something went wrong</h4>
                <p className="mb-0">{error.message}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="text-center mb-5 py-4">
              <div className="bg-white rounded-4 shadow-sm p-5 mx-auto" style={{maxWidth: '600px'}}>
                <i className="fa fa-tint fa-4x text-primary mb-4"></i>
                <h1 className="display-3 fw-bold text-dark mb-3">
                  Premium Beverages
                </h1>
                <p className="lead text-muted mb-4">
                  Quench your thirst with our carefully curated selection of refreshing drinks
                </p>
                <div className="row text-center">
                  <div className="col-4">
                    <i className="fa fa-leaf fa-2x text-success mb-2"></i>
                    <p className="small text-muted">Fresh & Natural</p>
                  </div>
                  <div className="col-4">
                    <i className="fa fa-snowflake-o fa-2x text-info mb-2"></i>
                    <p className="small text-muted">Ice Cold</p>
                  </div>
                  <div className="col-4">
                    <i className="fa fa-star fa-2x text-warning mb-2"></i>
                    <p className="small text-muted">Premium Quality</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <div className="bg-white rounded-3 shadow-sm p-4">
                  <div className="row text-center">
                    <div className="col-md-4">
                      <h3 className="text-primary mb-1">{drinks.length}</h3>
                      <small className="text-muted">Total Beverages</small>
                    </div>
                    <div className="col-md-4">
                      <h3 className="text-success mb-1">{currentDrinks.length}</h3>
                      <small className="text-muted">Showing Now</small>
                    </div>
                    <div className="col-md-4">
                      <h3 className="text-warning mb-1">{Math.ceil(drinks.length / itemsPerPage)}</h3>
                      <small className="text-muted">Pages</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drinks Grid */}
            <div className="row g-4 mb-5">
              {currentDrinks.map((drink) => (
                <div key={drink.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                  <div className="card h-100 border-0 shadow-lg drink-card position-relative overflow-hidden">
                    {/* Premium Badge */}
                    <div className="position-absolute top-0 start-0 z-index-1">
                      <div className="bg-gradient-primary text-white px-3 py-1 rounded-end-3">
                        <i className="fa fa-diamond me-1"></i>
                        <small className="fw-bold">PREMIUM</small>
                      </div>
                    </div>

                    {/* Image Container */}
                    <div className="position-relative overflow-hidden">
                      <Link to={`/drinks/view-drink/${drink.id}/${drink.name}`}>
                        <div className="drink-image-wrapper">
                          <img
                            className="card-img-top drink-image"
                            src={drink.drink_image}
                            alt={drink.name}
                            onError={(e) => handleImageError(e, drink.id)}
                          />
                          <div className="image-overlay d-flex align-items-center justify-content-center">
                            <i className="fa fa-search-plus fa-2x text-white"></i>
                          </div>
                        </div>
                      </Link>
                      
                      {/* Price Badge */}
                      <div className="position-absolute bottom-0 end-0 m-3">
                        <div className="bg-danger text-white px-3 py-2 rounded-pill shadow-sm">
                          <i className="fa fa-dollar me-1"></i>
                          <span className="fw-bold">{drink.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column">
                      {/* Header */}
                      <div className="mb-3">
                        <h5 className="card-title fw-bold text-dark mb-2 text-uppercase tracking-wide">
                          {drink.name}
                        </h5>
                        
                        {/* Rating */}
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <RatingComponent rating={drink.stars} />
                          <small className="text-muted">
                            <i className="fa fa-users me-1"></i>
                            Popular choice
                          </small>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4 flex-grow-1">
                        <div className="d-flex align-items-center mb-2">
                          <i className="fa fa-info-circle text-primary me-2"></i>
                          <small className="text-muted fw-semibold">DESCRIPTION</small>
                        </div>
                        <div className="description-content">
                          {expandedDrinkId === drink.id ? (
                            <div className="animated-text">
                              <p className="card-text text-dark">{drink.description}</p>
                              <button
                                className="btn btn-link p-0 text-primary fw-semibold"
                                onClick={() => toggleDrinkDescription(drink.id)}
                              >
                                <i className="fa fa-chevron-up me-1"></i>
                                Show less
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p className="card-text text-dark">
                                {drink.description.substring(0, 50)}
                                {drink.description.length > 80 && "..."}
                              </p>
                              {drink.description.length > 80 && (
                                <button
                                  className="btn btn-link p-0 text-primary fw-semibold"
                                  onClick={() => toggleDrinkDescription(drink.id)}
                                >
                                  <i className="fa fa-chevron-down me-1"></i>
                                  Read more
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="row g-2">
                        <div className="col-6">
                          <Link
                            to={`/drinks/view-drink/${drink.id}/${drink.name}`}
                            className="btn btn-outline-primary btn-sm w-100 fw-semibold"
                          >
                            <i className="fa fa-eye me-1"></i> Details
                          </Link>
                        </div>
                        <div className="col-6">
                          <button className="btn btn-danger btn-sm w-100 fw-semibold">
                            <i className="fa fa-shopping-cart me-1"></i> Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="mt-3 pt-3 border-top">
                        <div className="row text-center small text-muted">
                          <div className="col-4">
                            <i className="fa fa-clock-o d-block mb-1"></i>
                            Fresh
                          </div>
                          <div className="col-4">
                            <i className="fa fa-truck d-block mb-1"></i>
                            Fast Delivery
                          </div>
                          <div className="col-4">
                            <i className="fa fa-shield d-block mb-1"></i>
                            Quality
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {drinks.length > itemsPerPage && (
              <div className="row justify-content-center">
                <div className="col-auto">
                  <nav aria-label="Drinks pagination">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fa fa-page-o text-muted me-2"></i>
                      <small className="text-muted">
                        Page {currentPage} of {Math.ceil(drinks.length / itemsPerPage)} 
                        ({drinks.length} total items)
                      </small>
                    </div>
                    
                    <ul className="pagination pagination-lg justify-content-center shadow-sm">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                          className="page-link border-0 bg-white"
                          onClick={() => handlePageChange(currentPage - 1)}
                          aria-label="Previous"
                          disabled={currentPage === 1}
                        >
                          <i className="fa fa-chevron-left"></i>
                        </button>
                      </li>

                      {Array.from({
                        length: Math.ceil(drinks.length / itemsPerPage),
                      }).map((_, index) => (
                        <li
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          key={index}
                        >
                          <button
                            className="page-link border-0"
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentPage === Math.ceil(drinks.length / itemsPerPage)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link border-0 bg-white"
                          onClick={() => handlePageChange(currentPage + 1)}
                          aria-label="Next"
                          disabled={currentPage === Math.ceil(drinks.length / itemsPerPage)}
                        >
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DrinkListComponent;
