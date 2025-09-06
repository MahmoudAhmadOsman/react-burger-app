import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyle.css";

const FooterComponent = () => {
  return (
    <footer className="footer-modern bg-dark text-light">
      {/* Social Media Section */}
      <div className="footer-social border-bottom border-secondary">
        <div className="container py-4">
          <div className="d-flex justify-content-center justify-content-lg-between align-items-center">
            <div className="me-5 d-none d-lg-block">
              <span className="social-text fw-bold">LET'S STAY CONNECTED</span>
            </div>
            <div className="social-icons">
              <Link to="#" className="social-link me-3" aria-label="Facebook">
                <i className="fa fa-facebook-f"></i>
              </Link>
              <Link to="#" className="social-link me-3" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/in/mahmoudaosman/"
                className="social-link me-3"
                aria-label="LinkedIn"
              >
                <i className="fa fa-linkedin"></i>
              </Link>
              <Link
                to="https://github.com/MahmoudAhmadOsman"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fa fa-github"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content py-5">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h5 className="widget-title mb-4">Vast Burgers</h5>
                <p className="company-description mb-3">
                  Crafting exceptional dining experiences with premium
                  ingredients and innovative culinary techniques. Your
                  satisfaction is our passion.
                </p>
                <div className="company-stats d-flex gap-4">
                  <div className="stat-item text-center">
                    <i className="fa fa-users text-warning d-block mb-1"></i>
                    <small>10K+ Customers</small>
                  </div>
                  <div className="stat-item text-center">
                    <i className="fa fa-star text-warning d-block mb-1"></i>
                    <small>4.9 Rating</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h6 className="widget-title mb-4">Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/menu" className="footer-link">
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="footer-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/locations" className="footer-link">
                      Locations
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="footer-link">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h6 className="widget-title mb-4">Services</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/delivery" className="footer-link">
                      Delivery
                    </Link>
                  </li>
                  <li>
                    <Link to="/catering" className="footer-link">
                      Catering
                    </Link>
                  </li>
                  <li>
                    <Link to="/loyalty" className="footer-link">
                      Loyalty Program
                    </Link>
                  </li>
                  <li>
                    <Link to="/gift-cards" className="footer-link">
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h6 className="widget-title mb-4">Get In Touch</h6>
                <div className="contact-info">
                  <div className="contact-item mb-3">
                    <i className="fa fa-map-marker text-warning me-3"></i>
                    <span>Minnesota, MN 10012, US</span>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fa fa-envelope text-warning me-3"></i>
                    <a
                      href="mailto:info@vastburgers.com"
                      className="footer-link"
                    >
                      info@vastburgers.com
                    </a>
                  </div>
                  <div className="contact-item mb-3">
                    <i className="fa fa-phone text-warning me-3"></i>
                    <a href="tel:+01234567888" className="footer-link">
                      +1 (234) 567-888
                    </a>
                  </div>
                  <div className="contact-item">
                    <i className="fa fa-clock-o text-warning me-3"></i>
                    <span>Mon-Sun: 10:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom border-top border-secondary">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="copyright-text mb-0">
                <i className="fa fa-copyright me-1"></i>
                {new Date().getFullYear()} Vast Burgers, Inc. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="developer-credit mb-0">
                {/* <i className="fa fa-code me-1"></i> */}
                Crafted with{" "}
                {/* <i className="fa fa-heart text-danger mx-1"></i> */}
                by{" "}
                <Link
                  to="http://www.mahmoudosman.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="developer-link"
                >
                  Mahmoud Osman
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
