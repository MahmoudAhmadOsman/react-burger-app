import React, { useState, useEffect } from "react";
import BurgerService from "../service/BurgerService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import DrinkListComponent from "../drink/DrinkListComponent";
import RatingComponent from "../rating/RatingComponent";
import "./BurgerStyle.css";
const BurgerListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [burgers, setBurgers] = useState([]);
	const [drinks, setDrinks] = useState([]);
	const [searchTerm, setSearchTerm] = useState(""); // State for search input

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4; // Number of burgers to show per page

	const [expandedBurgerId, setExpandedBurgerId] = useState(null);

	const toggleBurgerDescription = (BurgerId) => {
		setExpandedBurgerId(BurgerId === expandedBurgerId ? null : BurgerId);
	};

	const getAllBurgers = async () => {
		try {
			const response = await BurgerService.getAllBurgers();
			setBurgers(response.data);
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

	// Function to handle search input change
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1); // Reset current page to the first page when search changes
	};

	// Function to handle pagination button clicks
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Calculate the index of the first and last burger on the current page
	const lastIndex = currentPage * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const currentBurgers = burgers
		.filter((burger) =>
			burger.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(firstIndex, lastIndex);

	return (
		<section className="burger">
			<div className="container mt-3">
				<div className="loadding">
					{loading ? (
						<div className="loading">
							<Loading />
						</div>
					) : error ? (
						<div className="alert alert-danger text-center">
							<h5>{error.message}</h5>
						</div>
					) : (
						<>
							<h1 className="text-danger">Vast Burgers</h1>
							<hr />
							<div className="row">
								<div className="col-md-12 mb-3">
									<div className="input-group mb-4">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="Search Burgers and Drinks..."
											value={searchTerm}
											onChange={handleSearchChange}
										/>
									</div>
								</div>
								{currentBurgers.length === 0 ? (
									<div className="col-md-12 text-center mt-4">
										<h5>
											The searched term{" "}
											<b className="text-danger">[ {searchTerm} ]</b> is not
											found!
										</h5>
									</div>
								) : (
									currentBurgers.map((burger) => (
										<div
											key={burger.id}
											className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3"
										>
											<div className="card">
												<Link
													to={`/burgers/view-burger/${burger.id}/${burger.name}`}
												>
													{burger.meal_img.length === 0 ? (
														<span>Loading...</span>
													) : (
														<img
															className="card-img-top img-fluid"
															src={burger.meal_img}
															alt={burger.name}
														/>
													)}
												</Link>
												<div className="card-body">
													<h3 className="card-title">{burger.name}</h3>
													<span className="burger-rating">
														<RatingComponent rating={burger.stars} />
													</span>
													<p className="text-warning fw-bold">
														Reviews: ({burger.review})
													</p>
													{/* <span className="card-text text-muted">
														{burger.description.slice(0, 45)}...
													</span> */}

													{expandedBurgerId === burger.id ? (
														<>
															<span>{burger.description}</span>
															<br />
															<button
																className="btn btn-link p-0"
																onClick={() =>
																	toggleBurgerDescription(burger.id)
																}
															>
																See less
															</button>
														</>
													) : (
														<>
															<span>
																<small
																	className="text-muted"
																	style={{ fontSize: "10px" }}
																>
																	Burger Description
																</small>{" "}
																<br />
																{burger.description.substring(0, 60)}
															</span>
															{burger.description.length > 60 && (
																<>
																	...
																	<button
																		className="btn btn-link p-0"
																		onClick={() =>
																			toggleBurgerDescription(burger.id)
																		}
																	>
																		See more
																	</button>
																</>
															)}
														</>
													)}

													<hr />
													<button className="btn btn-outline-danger fw-bold btn-sm">
														${burger.price}
													</button>
													<button
														className="btn btn-outline-secondary btn-sm  ms-1"
														disabled
													>
														{burger.calories} calories
													</button>
													<Link
														to={`/burgers/view-burger/${burger.id}/${burger.name}`}
														className="btn btn-outline-warning btn-sm ms-1"
													>
														VIEW
													</Link>
												</div>
											</div>
										</div>
									))
								)}
							</div>
							{/* Pagination buttons */}
							<div className="pagination justify-content-center">
								<ul className="pagination">
									<li
										className={`page-item ${
											currentPage === 1 ? "disabled" : ""
										}`}
									>
										<button
											className="page-link"
											onClick={() => handlePageChange(currentPage - 1)}
										>
											Previous
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
											Next
										</button>
									</li>
								</ul>
							</div>
							<DrinkListComponent />
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default BurgerListComponent;
