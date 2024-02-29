import React, { useContext } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BurgerService from "../service/BurgerService";
import { useEffect } from "react";
// import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import RatingComponent from "../rating/RatingComponent";
import CartItem from "../cart/CartItem";

const BurgerDetailsComponent = () => {
	const { id } = useParams();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cartItems")) || [];
	});

	//3.
	// const { addToCart } = useContext(CartContext);

	const screenSize = "md";

	const [burger, setBurger] = useState({
		name: "",
		price: "",
		description: "",
		review: "",
		meal_img: "",
		calories: "",
		fiber: "",
		protein: "",
		carbs: "",
	});

	const loadBurgerData = async () => {
		try {
			await BurgerService.getBurgerId(id)
				.then((res) => {
					setBurger(res.data);
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
		setCart([...cart, burger]);
		toast.success(`${burger.name} added to cart!!`, {
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
		loadBurgerData();
	}, []);

	return (
		<section className="burger-details">
			<div className="container mt-3">
				<div className="row mb-3">
					<div className="col-md-6">
						<h1 className="text-danger"> {burger.name} Details</h1>
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
								<h5>{error.message}</h5>
							</div>
						) : (
							""
						)}
					</div>
				</div>
				{/* Start of 2 row */}
				<div className="row shadow-lg p-2 mb-5 bg-body rounded">
					<div className="col-mg-6 col-md-6 col-sm-12 col-xs-12 mb-4">
						{burger.meal_img === "" ? (
							<h5 className="text-center mt-3">Loading...</h5>
						) : (
							<img
								className="img-fluid left-img"
								src={burger.meal_img}
								alt={burger.name}
							/>
						)}
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
						<h1 className="text-uppercase">{burger.name}</h1>
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
							Price: <b className="text-danger fw-bold ">${burger.price}</b>
						</h2>
						<span className="burger-rating">
							<RatingComponent rating={burger.stars}></RatingComponent>
						</span>
						<p>
							<b className="text-warning">Reviews:</b> ({burger.review})
						</p>
						<h4 className="text-muted">Description</h4>
						<p className="about">{burger.description}</p> <hr />
						<div className="meal_btn text-dark">
							<span>
								<i className="fa fa-chevron-right ms-2"></i> Calories:{" "}
								{burger.calories}
							</span>
							<span>
								<i className="fa fa-chevron-right ms-2"></i> Fiber:{" "}
								{burger.fiber}
							</span>
							<span>
								<i className="fa fa-chevron-right ms-2"></i> Protein:{" "}
								{burger.protein}
							</span>
							<span>
								<i className="fa fa-chevron-right ms-2"></i> Carbs:{" "}
								{burger.carbs}
							</span>
						</div>
						<div className="addToCartBtn mt-4">
							<button
								onClick={(e) => addToCart(e, burger.id)}
								className="btn btn-outline-warning w-100 btn-lg text-uppercase fw-bold"
							>
								ADD TO CART
							</button>
						</div>
					</div>
				</div>
				{/* End of 2 row */}
			</div>

			{/* End of new desing */}
		</section>
	);
};

export default BurgerDetailsComponent;
