import React, { useState, useEffect } from "react";
import BurgerService from "../service/BurgerService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import DrinkListComponent from "../drink/DrinkListComponent";
import RatingComponent from "../rating/RatingComponent";
import "./BurgerStyle.css";

// Array of high-quality, working burger images from Unsplash
const BURGER_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
  "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80",
];

const BurgerListComponent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [burgers, setBurgers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [expandedBurgerId, setExpandedBurgerId] = useState(null);

  const toggleBurgerDescription = (burgerId) => {
    setExpandedBurgerId(burgerId === expandedBurgerId ? null : burgerId);
  };

  const getAllBurgers = async () => {
    try {
      const response = await BurgerService.getAllBurgers();
      // Assign working images to each burger
      const burgersWithImages = response.data.map((burger, index) => ({
        ...burger,
        meal_img: BURGER_IMAGES[index % BURGER_IMAGES.length], // Cycle through images
      }));
      setBurgers(burgersWithImages);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.warn(`An Error ${error} has occurred!!`, {
        position: "bottom-right",
      });
    }
  };

  const getAllDrinks = async () => {
    try {
      const response = await BurgerService.getAllDrinks();
      setDrinks(response.data);
    } catch (error) {
      setError(error);
      toast.warn(`An Error ${error} has occurred!!`, {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getAllBurgers();
    getAllDrinks();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentBurgers = burgers
    .filter((burger) =>
      burger.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(firstIndex, lastIndex);

  const renderBurgerImage = (burger) => (
    <img
      className="card-img-top img-fluid burger-image"
      src={burger.meal_img}
      alt={burger.name}
      onError={(e) => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src = BURGER_IMAGES[0]; // Fallback to first image
      }}
    />
  );

  return (
    <section className="burger-list py-5">
      <div className="container px-4">
        {loading ? (
          <div className="text-center py-5">
            <Loading />
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center border-0 shadow-sm">
            <i className="fa fa-exclamation-triangle fa-2x mb-3 text-danger"></i>
            <h5>{error.message}</h5>
          </div>
        ) : (
          <>
            <div className="hero-section text-center py-5 mb-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="hero-content">
                    <i className="fa fa-star fa-2x text-warning mb-3 hero-icon"></i>
                    <h1 className="display-3 fw-bold text-dark mb-3 hero-title">
                      <span className="text-danger">Vast</span> Burgers
                    </h1>
                    <p className="lead text-muted mb-4 hero-subtitle">
                      Crafted with passion, served with excellence - Experience the ultimate burger journey
                    </p>
                    <div className="search-container position-relative mb-4">
                      <div className="input-group input-group-lg shadow-lg rounded-pill overflow-hidden">
                        <span className="input-group-text bg-gradient-danger text-white border-0 px-4">
                          <i className="fa fa-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-0 px-4"
                          placeholder="Discover your perfect burger..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <span className="input-group-text bg-white border-0 px-4">
                          <i className="fa fa-sliders text-muted"></i>
                        </span>
                      </div>
                    </div>
                    <div className="stats-row d-flex justify-content-center gap-4 flex-wrap">
                      <div className="stat-item">
                        <i className="fa fa-cutlery text-danger"></i>
                        <span className="fw-bold ms-2">{burgers.length}+ Burgers</span>
                      </div>
                      <div className="stat-item">
                        <i className="fa fa-star text-warning"></i>
                        <span className="fw-bold ms-2">Premium Quality</span>
                      </div>
                      <div className="stat-item">
                        <i className="fa fa-truck text-success"></i>
                        <span className="fw-bold ms-2">Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider mb-5">
              <div className="row">
                <div className="col-12">
                  <div className="divider-line"></div>
                </div>
              </div>
            </div>

            {currentBurgers.length === 0 ? (
              <div className="empty-state text-center py-5">
                <div className="empty-content py-5">
                  <div className="empty-icon mb-4">
                    <i className="fa fa-search fa-4x text-muted mb-3"></i>
                  </div>
                  <h3 className="text-dark mb-3">No burgers found</h3>
                  <p className="text-muted mb-4">
                    We couldn't find any burgers matching{" "}
                    <span className="fw-bold text-danger">"{searchTerm}"</span>
                  </p>
                  <div className="suggestions">
                    <p className="text-muted mb-3">Try searching for:</p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                      <span className="badge bg-light text-dark px-3 py-2">Cheeseburger</span>
                      <span className="badge bg-light text-dark px-3 py-2">Chicken</span>
                      <span className="badge bg-light text-dark px-3 py-2">Veggie</span>
                      <span className="badge bg-light text-dark px-3 py-2">Bacon</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="results-header mb-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h3 className="fw-bold text-dark mb-0">
                        <i className="fa fa-fire text-danger me-2"></i>
                        Our Menu
                      </h3>
                      <p className="text-muted mb-0">
                        {searchTerm ? (
                          <>Showing {currentBurgers.length} results for "{searchTerm}"</>
                        ) : (
                          <>Discover our collection of {burgers.length} premium burgers</>
                        )}
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <div className="view-options d-inline-flex bg-white rounded-pill shadow-sm p-1">
                        <button className="btn btn-sm btn-danger rounded-pill px-3">
                          <i className="fa fa-th-large me-1"></i> Grid
                        </button>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill px-3 ms-1">
                          <i className="fa fa-list me-1"></i> List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="burger-grid row g-4">
                  {currentBurgers.map((burger) => (
                    <div key={burger.id} className="col-xl-3 col-lg-4 col-md-6">
                      <div className="burger-card card h-100 border-0 shadow-sm overflow-hidden hover-effect">
                        <div className="card-image-container position-relative overflow-hidden">
                          <Link
                            to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                            className="image-link"
                          >
                            {renderBurgerImage(burger)}
                          </Link>
                          <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                            <div className="quick-actions d-flex gap-2">
                              <Link
                                to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                                className="btn btn-sm btn-white rounded-circle shadow-sm"
                                title="Quick View"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <button className="btn btn-sm btn-white rounded-circle shadow-sm" title="Add to Favorites">
                                <i className="fa fa-heart"></i>
                              </button>
                            </div>
                          </div>
                          <div className="position-absolute top-0 end-0 m-3">
                            <span className="price-badge badge bg-gradient-danger text-white rounded-pill px-3 py-2 fw-bold">
                              <i className="fa fa-dollar me-1"></i>{burger.price}
                            </span>
                          </div>
                          <div className="position-absolute bottom-0 start-0 m-3">
                            <span className="calories-badge badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1">
                              <i className="fa fa-fire text-warning me-1"></i>{burger.calories} cal
                            </span>
                          </div>
                        </div>
                        <div className="card-body p-4">
                          <div className="burger-header mb-3">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="burger-info flex-grow-1">
                                <h5 className="burger-title fw-bold text-dark mb-1">
                                  {burger.name}
                                </h5>
                                <div className="rating-section d-flex align-items-center mb-2">
                                  <RatingComponent rating={burger.stars} />
                                  <small className="text-muted ms-2 fw-medium">
                                    ({burger.review} reviews)
                                  </small>
                                </div>
                              </div>
                              <div className="burger-actions">
                                <button className="btn btn-sm btn-outline-light border-0 text-muted" title="Add to Wishlist">
                                  <i className="fa fa-heart-o"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="burger-description mb-3">
                            {expandedBurgerId === burger.id ? (
                              <>
                                <p className="card-text text-muted mb-2">
                                  {burger.description}
                                </p>
                                <button
                                  className="btn btn-link p-0 small text-decoration-none text-danger fw-medium"
                                  onClick={() => toggleBurgerDescription(burger.id)}
                                >
                                  <i className="fa fa-chevron-up me-1"></i>Show less
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="card-text text-muted mb-2">
                                  {burger.description.substring(0, 85)}
                                  {burger.description.length > 85 && "..."}
                                </p>
                                {burger.description.length > 85 && (
                                  <button
                                    className="btn btn-link p-0 small text-decoration-none text-danger fw-medium"
                                    onClick={() => toggleBurgerDescription(burger.id)}
                                  >
                                    <i className="fa fa-chevron-down me-1"></i>Read more
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                          <div className="burger-actions-footer d-flex gap-2">
                            <Link
                              to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                              className="btn btn-outline-danger flex-grow-1 fw-medium"
                            >
                              <i className="fa fa-eye me-2"></i>View Details
                            </Link>
                            <Link
                              to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                              className="btn btn-danger px-4 fw-medium"
                            >
                              <i className="fa fa-shopping-cart me-2"></i>Order
                            </Link>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
                </div>
              </>
            )}

            {burgers.filter((burger) =>
              burger.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length > itemsPerPage && (
              <div className="pagination-section mt-5">
                <nav aria-label="Burger pagination">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="text-muted mb-0">
                      Showing {firstIndex + 1}-{Math.min(lastIndex, burgers.filter((burger) =>
                        burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length)} of {burgers.filter((burger) =>
                        burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length} burgers
                    </p>
                    <div className="pagination-info">
                      <span className="text-muted">Page {currentPage} of {Math.ceil(
                        burgers.filter((burger) =>
                          burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length / itemsPerPage
                      )}</span>
                    </div>
                  </div>
                  
                  <ul className="pagination justify-content-center pagination-modern">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link border-0 rounded-pill me-2"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="fa fa-chevron-left"></i>
                        <span className="ms-1 d-none d-sm-inline">Previous</span>
                      </button>
                    </li>

                    {Array.from({
                      length: Math.ceil(
                        burgers.filter((burger) =>
                          burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length / itemsPerPage
                      ),
                    }).map((_, index) => (
                      <li
                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        key={index}
                      >
                        <button
                          className="page-link border-0 rounded-circle mx-1"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(
                          burgers.filter((burger) =>
                            burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length / itemsPerPage
                        )
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link border-0 rounded-pill ms-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(
                          burgers.filter((burger) =>
                            burger.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ).length / itemsPerPage
                        )}
                      >
                        <span className="me-1 d-none d-sm-inline">Next</span>
                        <i className="fa fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            <DrinkListComponent />
          </>
        )}
      </div>
    </section>
  );
};

export default BurgerListComponent;
