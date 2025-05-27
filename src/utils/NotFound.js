import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page bg-light">
      <div className="container">
        <div className="row align-items-center justify-content-center min-vh-100 py-5">
          <div className="col-lg-6 text-center">
            <div className="error-content bg-white p-5 rounded-4 shadow-sm">
              <div className="error-icon mb-4">
                <i className="fa fa-frown-o fa-5x text-danger"></i>
              </div>
              <h1 className="display-1 fw-bold text-gradient text-danger mb-3">
                404
              </h1>
              <h2 className="h3 mb-3 text-uppercase">Page Not Found</h2>
              <p className="lead text-muted mb-4">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/" className="btn btn-danger btn-lg px-4">
                  <i className="fa fa-home mr-2"></i> Go Home
                </Link>
                <button
                  className="btn btn-outline-secondary btn-lg px-4"
                  onClick={() => window.history.back()}
                >
                  <i className="fa fa-arrow-left mr-2"></i> Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
