import React from "react";
import { useState } from "react";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
import "./DrinkStyle.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";

const DrinkListComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [drinks, setDrinks] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const [expandedDrinks, setExpandedDrinks] = useState([]); // see more, see less

	const itemsPerPage = 4; // Number of burgers to show per page
	const getAllDrinks = async () => {
		try {
			await BurgerService.getAllDrinks()
				.then((res) => {
					setDrinks(res.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					toast.warn(`An Error ${error} has occured!!`, {
						position: "bottom-right",
					});
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occured!!`, {
				position: "bottom-right",
			});
		}
	};

	useEffect(() => {
		getAllDrinks();
	}, []);

	// Calculate the index of the first and last burger on the current page
	const lastIndex = currentPage * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const currentDrinks = drinks.slice(firstIndex, lastIndex);

	// Function to handle pagination button clicks
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<section className="drink-section bg-secondary">
			<div className="container mt-3">
				{/* Start of Drinks  */}
				<div className="row mt-4">
					{loading ? (
						<div className="loading">
							<Loading />
						</div>
					) : error ? (
						<div className="alert alert-danger text-center">
							<h5>{setError(error.message)}</h5>
						</div>
					) : (
						<>
							<h1 className="text-danger bg-dark text-white p-3">Beverages</h1>{" "}
							<hr />
							<div className="row">
								{currentDrinks.map((drink) => (
									<div
										key={drink.id}
										className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-3"
									>
										<div className="card">
											<Link to={`/view-drink/${drink.id}`}>
												{drink.drink_image.length === 0 ? (
													<>
														<span>Loading...</span>
													</>
												) : (
													<img
														className="card-img-top img-fluid"
														src={drink.drink_image}
														alt={drink.name}
													/>
												)}
											</Link>
											<div className="card-body">
												<h4 className="card-title">{drink.name}</h4>
												<span className="burger-rating">
													<RatingComponent
														rating={drink.stars}
													></RatingComponent>
												</span>
												<span className="card-text text-muted">
													{expandedDrinks.includes(drink.id)
														? drink.description
														: drink.description.slice(0, 40)}
													...
												</span>

												{expandedDrinks.includes(drink.id) ? (
													<button
														className="btn btn-link btn-sm"
														onClick={() =>
															setExpandedDrinks(
																expandedDrinks.filter((id) => id !== drink.id)
															)
														}
													>
														SEE LESS
													</button>
												) : (
													<button
														className="btn btn-link btn-sm"
														onClick={() =>
															setExpandedDrinks([...expandedDrinks, drink.id])
														}
													>
														SEE MORE
													</button>
												)}
												<hr />
												<button className="btn btn-outline-danger fw-bold btn-md">
													${drink.price}
												</button>
												<Link
													to={`/view-drink/${drink.id}`}
													className="btn btn-outline-warning btn-md ms-3"
												>
													VIEW
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Pagination buttons */}
							<div className="pagination justify-content-center">
								<ul className="pagination">
									{/* Previous button */}
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

									{/* Next button */}
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
										>
											Next
										</button>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
				{/* End of Drinks  */}
			</div>
		</section>
	);
};

export default DrinkListComponent;
