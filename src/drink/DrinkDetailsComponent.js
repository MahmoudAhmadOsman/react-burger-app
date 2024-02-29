import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";

const DrinkDetailsComponent = () => {
	const { id } = useParams();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cartItems")) || [];
	});

	const screenSize = "md";

	const [drink, setDrink] = useState({
		name: "",
		drink_image: "",
		price: "",
		description: "",
	});

	const loadDrinkData = async () => {
		try {
			await BurgerService.getDrinkId(id)
				.then((res) => {
					setDrink(res.data);
					setLoading(false);
				})
				.catch((error) => {
					setError(error);
					toast.warn(`An Error ${error} has occured!!`, {
						position: "bottom-right",
					});
				});
		} catch (error) {
			setError(error);

			toast.warn(`An Error ${error} has occured!!`, {
				position: "bottom-right",
			});
		}
	};

	const addToCart = (e) => {
		e.preventDefault();
		setCart([...cart, drink]);
		toast.success(`${drink.name} added to cart!!`, {
			position: "bottom-right",
		});

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	//get localStorage key
	useEffect(() => {
		const data = localStorage.getItem("cartItems");
		if (data) {
			setCart(JSON.parse(data));
		}
	}, []);

	//set localStorage key
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
		loadDrinkData();
	}, []);

	return (
		<section className="burger-details">
			{loading ? (
				<>
					<Loading />
				</>
			) : (
				<>
					<div className="container mt-3">
						<div className="row mb-3">
							<div className="col-md-6">
								<h1 className="text-danger"> {drink.name} Details</h1>
							</div>
							<div className="col-md-3">
								<i className="fa fa-chevron-left" />
								<Link to="/burgers" className="ms-2">
									Back
								</Link>
							</div>
							<div className="col-md-3">
								<div className="float-end">
									<div className="cart-items d-flex">
										<CartItem cart={cart} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			{/* Start of new desing */}
			<div className="container">
				<div className="row">
					<div className="col-md-12">
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
								{/* Start of 2 row */}
								<div className="row shadow-lg p-2 mb-5 bg-body rounded">
									<div className="col-mg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
										{drink.drink_image === "" ? (
											<h5 className="text-center mt-3">Loading...</h5>
										) : (
											<img
												className="img-fluid left-img"
												src={drink.drink_image}
												alt={drink.name}
											/>
										)}
									</div>
									<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
										<h1 className="text-uppercase">{drink.name}</h1>
										<div>
											{screenSize === "xs" ? null : (
												<>
													{screenSize === "md" ||
													screenSize === "lg" ||
													screenSize === "sm" ? (
														<hr />
													) : null}
												</>
											)}
										</div>
										<h2>
											Price:{" "}
											<b className="text-danger fw-bold">${drink.price}</b>
										</h2>
										<p className="burger-rating">
											<RatingComponent rating={drink.stars}></RatingComponent>
										</p>
										<h4 className="text-muted">Description</h4>
										<p className="about">{drink.description}</p> <hr />
										<div className="addToCartBtn mt-4">
											<button
												onClick={(e) => addToCart(e, drink.id)}
												className="btn btn-outline-warning w-100 btn-lg text-uppercase fw-bold"
											>
												ADD TO CART
											</button>
										</div>
									</div>
								</div>
								{/* End of 2 row */}
							</>
						)}
					</div>
				</div>
			</div>

			{/* End of new desing */}
		</section>
	);
};

export default DrinkDetailsComponent;
