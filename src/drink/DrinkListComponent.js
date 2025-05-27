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
      <div className="container">
        {loading ? (
          <div className="text-center py-5">
            <Loading />
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">
            <h5>{error.message}</h5>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-danger mb-3">
                <i className="fa fa-glass mr-2"></i> Beverages
              </h1>
              <p className="lead text-muted">
                Refreshing drinks to complement your meal
              </p>
            </div>

            <div className="row g-4">
              {currentDrinks.map((drink) => (
                <div key={drink.id} className="col-lg-3 col-md-6">
                  <div className="card h-100 shadow-sm border-0 overflow-hidden">
                    <div className="position-relative">
                      <Link to={`/drinks/view-drink/${drink.id}/${drink.name}`}>
                        <img
                          className="card-img-top img-fluid drink-image"
                          src={drink.drink_image}
                          alt={drink.name}
                          onError={(e) => handleImageError(e, drink.id)}
                        />
                      </Link>
                      <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded">
                        ${drink.price}
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{drink.name}</h5>

                      <div className="mb-2">
                        <RatingComponent rating={drink.stars} />
                      </div>

                      <div className="mb-3 flex-grow-1">
                        <small className="text-muted">Description</small>
                        <p className="card-text">
                          {expandedDrinkId === drink.id ? (
                            <>
                              {drink.description}
                              <button
                                className="btn btn-link p-0 text-primary"
                                onClick={() => toggleDrinkDescription(drink.id)}
                              >
                                <small>Show less</small>
                              </button>
                            </>
                          ) : (
                            <>
                              {drink.description.substring(0, 60)}
                              {drink.description.length > 60 && (
                                <>
                                  ...{" "}
                                  <button
                                    className="btn btn-link p-0 text-primary"
                                    onClick={() =>
                                      toggleDrinkDescription(drink.id)
                                    }
                                  >
                                    <small>Show more</small>
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link
                          to={`/drinks/view-drink/${drink.id}/${drink.name}`}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <i className="fa fa-eye mr-1"></i> View
                        </Link>
                        <button className="btn btn-danger btn-sm">
                          <i className="fa fa-cart-plus mr-1"></i> Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {drinks.length > itemsPerPage && (
              <nav className="mt-5" aria-label="Drinks pagination">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
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
                        className="page-link"
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
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DrinkListComponent;
