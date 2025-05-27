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
            <div className="row mb-4 align-items-center">
              <div className="col-md-6">
                <h1 className="display-4 fw-bold text-danger mb-0">
                  {/* <i className="fa fa-cutlery me-2"></i> */}
                  Vast Burgers
                </h1>
                <p className="text-muted">Delicious burgers for everyone</p>
              </div>
              <div className="col-md-6">
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fa fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg border-start-0"
                    placeholder="Search burgers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>

            <hr className="my-4" />

            {currentBurgers.length === 0 ? (
              <div className="text-center py-5">
                <div className="py-5">
                  <i className="fa fa-search fa-4x text-muted mb-3"></i>
                  <h4 className="text-muted">
                    No burgers found for{" "}
                    <span className="text-danger">"{searchTerm}"</span>
                  </h4>
                  <p className="text-muted">Try a different search term</p>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {currentBurgers.map((burger) => (
                  <div key={burger.id} className="col-lg-3 col-md-6">
                    <div className="card h-100 border-0 shadow-sm overflow-hidden hover-effect">
                      <div className="position-relative">
                        <Link
                          to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                        >
                          {renderBurgerImage(burger)}
                        </Link>
                        <div className="position-absolute top-0 end-0 m-2">
                          <span className="badge bg-danger rounded-pill">
                            <i className="fa fa-tag me-1"></i>${burger.price}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title fw-bold mb-0">
                            {burger.name}
                          </h5>
                          <span className="badge bg-light text-dark">
                            <i className="fa fa-fire text-danger me-1"></i>
                            {burger.calories} cal
                          </span>
                        </div>

                        <div className="mb-2">
                          <RatingComponent rating={burger.stars} />
                          <small className="text-muted ms-2">
                            ({burger.review})
                          </small>
                        </div>

                        <div className="mb-3">
                          {expandedBurgerId === burger.id ? (
                            <>
                              <p className="card-text small">
                                {burger.description}
                              </p>
                              <button
                                className="btn btn-link p-0 small text-decoration-none"
                                onClick={() =>
                                  toggleBurgerDescription(burger.id)
                                }
                              >
                                <i className="fa fa-chevron-up me-1"></i>Show
                                less
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="card-text small">
                                {burger.description.substring(0, 80)}
                                {burger.description.length > 80 && (
                                  <>
                                    ...{" "}
                                    <button
                                      className="btn btn-link p-0 small text-decoration-none"
                                      onClick={() =>
                                        toggleBurgerDescription(burger.id)
                                      }
                                    >
                                      <i className="fa fa-chevron-down me-1"></i>
                                      Read more
                                    </button>
                                  </>
                                )}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <Link
                            to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="fa fa-eye me-1"></i> View
                          </Link>
                          <Link
                            to={`/burgers/view-burger/${burger.id}/${burger.name}`}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fa fa-cart-plus me-1"></i> Order
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {burgers.filter((burger) =>
              burger.name.toLowerCase().includes(searchTerm.toLowerCase())
            ).length > itemsPerPage && (
              <nav className="mt-5">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="fa fa-chevron-left"></i> Previous
                    </button>
                  </li>

                  {Array.from({
                    length: Math.ceil(
                      burgers.filter((burger) =>
                        burger.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ).length / itemsPerPage
                    ),
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
                      currentPage ===
                      Math.ceil(
                        burgers.filter((burger) =>
                          burger.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ).length / itemsPerPage
                      )
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next <i className="fa fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}

            <DrinkListComponent />
          </>
        )}
      </div>
    </section>
  );
};

export default BurgerListComponent;
