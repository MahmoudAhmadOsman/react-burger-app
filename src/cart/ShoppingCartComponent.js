import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import "./ShoppingCartStyle.css";
import BurgerService from "../service/BurgerService";

const ShoppingCartComponent = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [order, setOrder] = useState([]);

	const [cart, setCart] = useState(() => {
		return JSON.parse(localStorage.getItem("cartItems")) || [];
	});

	//Remove cart item
	const handleRemoveCartItem = (item) => {
		const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
		setCart(updatedCart);

		setTimeout(() => {
			window.location.reload();
		}, 2000);
		toast.error(`${item.name} removed from cart!!`, {
			position: "bottom-right",
			autoClose: 2000,
		});
	};

	//handleSubmitOrder
	// const handleSubmitOrder = (e) => {
	// 	e.preventDefault();
	// 	setOrder(true);
	// 	setTimeout(() => {
	// 		toast.success("Order placed successfully!!", {
	// 			position: "bottom-right",
	// 			autoClose: 2000,
	// 		});
	// 		navigate("/orders");
	// 		setOrder(false);
	// 	}, 2000);

	// 	const updatedCart = cart.filter((cartItem) => cartItem.quantity === 0);
	// 	setCart(updatedCart);
	// 	localStorage.setItem("cartItems", JSON.stringify(updatedCart));
	// };

	// const handlePlaceOrder = (e) => {
	// 	e.PreventDefault();
	// 	// const orderData = {
	// 	// 	totalPrice: calculateTotalPrice(),
	// 	// 	shippingCost:
	// 	// 		calculateTotalPrice() > 160 ? 0 : calculateTotalPrice() * 0.06 + 3.99,
	// 	// };

	// 	// Iterate over each cart item and send a separate API request
	// 	cart.forEach((item) => {
	// 		const itemData = {
	// 			id: item.id,
	// 			name: item.name,
	// 			meal_img: item.meal_img,
	// 			description: item.description,
	// 			price: item.price,
	// 		};

	// 		BurgerService.saveOrder(itemData)
	// 			.then((res) => {
	// 				toast.success(`Order is placed successfully!!`, {
	// 					position: "bottom-right",
	// 					autoClose: 3000,
	// 				});
	// 				setCart([]);
	// 				setTimeout(() => {
	// 					navigate("/orders");
	// 					window.location.reload();
	// 				}, 200);
	// 			})
	// 			.catch((error) => {
	// 				toast.warn(`An Error ${error} has occured!!`, {
	// 					position: "top-right",
	// 					autoClose: 3000,
	// 				});
	// 				console.log(error.message);
	// 			});

	// 		console.log(itemData);
	// 	});
	// };

	// Function to place the order
	const handlePlaceOrder = () => {
		// Prepare the data to send in the API request
		const orderData = {
			cart: cart,
			totalPrice: totalPrice,
			date: new Date().toISOString(), // Add the current date
		};

		// Make the API request to place the order
		fetch("https://stapes-api.onrender.com/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Order placed successfully:", data);
				toast.success(`Order is placed successfully!!`, {
					position: "bottom-right",
					autoClose: 3000,
				});
				console.log("Order data: ", orderData);
				// Reset the cart and total price
				setCart([]);
				localStorage.clear(); // Clear local storage
				navigate("/orders");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			})
			.catch((error) => {
				// Handle any errors that occur during the API request
				console.error(
					`Error ${error.message} has occured while placing an order`,
					error.message
				);
				toast.warn(
					`An error ${error.message} has occured while placing an order`,
					{
						position: "bottom-right",
						autoClose: 2000,
					}
				);
			});
	};

	// Increase quantity
	// const handleIncreaseQuantity = (item) => {
	// 	const updatedCart = cart.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			const newQuantity = isNaN(cartItem.quantity)
	// 				? 1
	// 				: cartItem.quantity + 1;
	// 			return { ...cartItem, quantity: newQuantity };
	// 		}
	// 		return cartItem;
	// 	});
	// 	setCart(updatedCart);
	// };

	//Decrease quantity
	// const handleDecreaseQuantity = (item) => {
	// 	const updatedCart = cart.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			const newQuantity = isNaN(cartItem.quantity)
	// 				? 0
	// 				: Math.max(cartItem.quantity - 1, 0);
	// 			return { ...cartItem, quantity: newQuantity };
	// 		}
	// 		return cartItem;
	// 	});
	// 	setCart(updatedCart);
	// };

	// Calculate subtotal for an item
	// const calculateSubtotal = (item) => {
	// 	if (
	// 		item.price &&
	// 		item.quantity &&
	// 		!Number.isNaN(item.price) &&
	// 		!Number.isNaN(item.quantity)
	// 	) {
	// 		return item.price * item.quantity;
	// 	}
	// 	return 0;
	// };

	// // Calculate total price
	// const totalPrice = cart.reduce(
	// 	(total, item) => total + calculateSubtotal(item),
	// 	0
	// );

	// Ori: Calculate total price
	const totalPrice = cart.reduce(
		(total, item) => total + parseFloat(item.price),
		0
	);

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

	return (
		<>
			<section className="burger-shopping-cart">
				{loading ? (
					<div className="loading">
						<Loading />
						{setLoading(false)}
					</div>
				) : error ? (
					<div className="alert alert-danger text-center">
						<h5>{setError(error.message)} </h5>
					</div>
				) : (
					<>
						<div className="container mt-3">
							{cart.length === 0 ? (
								<div className="row">
									<div className="col-md-6 offset-md-2">
										<h1 className="text-danger">Your cart is empty!</h1>
										<Link className="h6" to={"/burgers"}>
											Continue Shopping
										</Link>
									</div>
								</div>
							) : (
								<>
									<h1 className="text-success"> Shopping Cart Items</h1>
									<div className="float-end" style={{ marginBottom: "10px", marginTop: "-6px" }}>
										<Link
											className="float-end btn btn-outline-info"
											to={"/burgers"}
										>
											Back to shopping
										</Link>
									</div>
									<hr />
									<br />

									<div className="row mt-3">
										<div className="col">
											{/* Start of Table */}
											<div className="table-responsive shadow-lg p-3 mb-5 bg-body rounded">
												<table className="table table-hover table-bordered table-borderless">
													<thead>
														<tr className="table-secondary">
															<th></th>
															<th> Name</th>
															<th>Price</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{cart
															.sort((a, b) => a.id - b.id)
															.map((item) => (
																<tr key={item.id}>
																	<td>
																		{item.meal_img ? (
																			<Link to={`/view-burger/${item.id}`}>
																				<img
																					className="img-fluid burger-in-cart"
																					src={item.meal_img}
																					alt={item.name}
																				/>
																			</Link>
																		) : (
																			<Link to={`/view-drink/${item.id}`}>
																				<img
																					className="img-fluid burger-in-cart"
																					src={item.drink_image}
																					alt={item.name}
																				/>
																			</Link>
																		)}

																		<p className="cart-text text-muted mt-3">
																			<b className="h5"> Description</b>
																			<br />
																			{item.description.slice(0, 40)}...{" "}
																		</p>
																	</td>
																	<td>
																		<h4>{item.name}</h4>
																	</td>
																	<td>
																		<h4 className="text-danger fw-bold">
																			${item.price}
																		</h4>
																	</td>

																	<td>
																		<button
																			title="REMOVE"
																			onClick={() => handleRemoveCartItem(item)}
																			className="btn btn-outline-danger btn-sm w-100"
																		>
																			<i className="fa fa-trash"></i>
																		</button>
																	</td>

																	{/* <td>
																		<div className="quantity-controls">
																			<button
																				onClick={() =>
																					handleDecreaseQuantity(item)
																				}
																				disabled={item.quantity <= 1}
																				className="btn btn-outline-secondary"
																			>
																				<i className="fa fa-minus-circle"> </i>
																			</button>
																			<span className="quantity ms-2">
																				{item.quantity}
																			</span>
																			<button
																				onClick={() =>
																					handleIncreaseQuantity(item)
																				}
																				className="btn btn-outline-secondary"
																			>
																				<i className="fa fa-plus-circle"> </i>
																			</button>
																		</div>
																		${calculateSubtotal(item).toFixed(2)}
																	</td> */}
																</tr>
															))}
													</tbody>
												</table>

												<div className="float-end">
													<div className="table-responsive">
														<table className="table table-hover table-secondary">
															<thead>
																<tr>
																	<th>Total Price</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td className="text-danger fw-bold">
																		${totalPrice.toFixed(2)}
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
											{/* End of Table */}
										</div>
									</div>
									{/* Add order button */}

									<div className="float-end" style={{ marginBottom: "10px" }}>
										<button
											onClick={handlePlaceOrder}
											className="btn btn-outline-warning btn-lg w-100 mt-3"
										>
											PLACE ORDER
										</button>
									</div>
								</>
							)}
						</div>
					</>
				)}
			</section>
		</>
	);
};

export default ShoppingCartComponent;
