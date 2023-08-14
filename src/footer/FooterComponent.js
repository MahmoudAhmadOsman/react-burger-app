import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyle.css";

const FooterComponent = () => {
	return (
		<section className="footer text-center text-lg-starttext-white">
			{/* Section: Social media */}
			<div className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
				{/* Left */}
				<div className="me-5 d-none d-lg-block">
					<span>LET'S STAY CONNECTED</span>
				</div>
				{/* Left */}
				{/* Right */}
				<div>
					<Link to="#" className="me-4 text-reset">
						<i className="fa fa-facebook-f" />
					</Link>
					<Link to="#" className="me-4 text-reset">
						<i className="fa fa-twitter" />
					</Link>

					<Link
						to="https://www.linkedin.com/in/mahmoudaosman/"
						className="me-4 text-reset"
					>
						<i className="fa fa-linkedin" />
					</Link>
					<Link
						to="https://github.com/MahmoudAhmadOsman"
						className="me-4 text-reset"
					>
						<i className="fa fa-github" />
					</Link>
				</div>
				{/* Right */}
			</div>
			{/* Section: Social media */}
			{/* Section: Links  */}
			<div>
				<div className="container text-center text-md-start mt-5">
					{/* Grid row */}
					<div className="row mt-3">
						{/* Grid column */}
						<div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
							{/* Content */}
							<h6 className="text-uppercase fw-bold mb-4">
								<i className="fa fa-gem me-3" />
								Vast Burgers
							</h6>
							<p>
								Mahmoud Osman, a seasoned full stack software engineer with
								extensive experience in the field, has spearheaded the
								development of this project.
							</p>
						</div>
						{/* Grid column */}
						{/* Grid column */}
						<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
							{/* Links */}
							<h6 className="text-uppercase fw-bold mb-4">Products</h6>
							<p>
								<Link to="#" className="text-reset">
									Spring Boot
								</Link>
							</p>
							<p>
								<Link to="#" className="text-reset">
									React
								</Link>
							</p>
							<p>
								<Link to="#" className="text-reset">
									JPA
								</Link>
							</p>
							<p>
								<Link to="#" className="text-reset">
									SQL
								</Link>
							</p>
						</div>
						{/* Grid column */}
						{/* Grid column */}
						<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
							{/* Links */}
							<h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
							<p>
								<Link to="#" className="text-reset">
									Pricing
								</Link>
							</p>
							<p>
								<Link to="#" className="text-reset">
									Settings
								</Link>
							</p>

							<p>
								<Link to="#" className="text-reset">
									Help
								</Link>
							</p>
						</div>
						{/* Grid column */}
						{/* Grid column */}
						<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
							{/* Links */}
							<h6 className="text-uppercase fw-bold mb-4">Contact</h6>
							<p>
								<i className="fa fa-home me-3" /> Minnesota, MN 10012, US
							</p>
							<p>
								<i className="fa fa-envelope me-3" />
								info@suport.com
							</p>
							<p>
								<i className="fa fa-phone me-3" /> + 01 234 567 88
							</p>
							<p>
								<i className="fa fa-print me-3" /> + 01 234 567 89
							</p>
						</div>
						{/* Grid column */}
					</div>
					{/* Grid row */}
				</div>
			</div>
			{/* Section: Links  */}
			{/* Copyright */}
			<div
				className="text-center p-4"
				style={{ backgroundColor: "rgba(255 255 255 / 5%)" }}
			>
				&copy; Copyright. {new Date().getFullYear()}. VAST BURGERS, INC. All
				rights reserved. &nbsp; Designed & developed by{" "}
				<Link
					to="http://www.mahmoudosman.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Mahmoud Osman
				</Link>
			</div>
			{/* Copyright */}
		</section>
	);
};

export default FooterComponent;
