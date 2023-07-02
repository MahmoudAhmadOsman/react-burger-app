import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";

const ShoppingCartComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
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
		toast.warn(`${item.name} removed from cart!!`, {
			position: "bottom-right",
			autoClose: 2000,
		});
	};

	// Increase quantity
	// const handleIncreaseQuantity = (item) => {
	// 	const updatedCart = cart.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			const newQuantity = Number.isNaN(cartItem.quantity)
	// 				? 1
	// 				: cartItem.quantity + 1;
	// 			return { ...cartItem, quantity: newQuantity };
	// 		}
	// 		return cartItem;
	// 	});
	// 	setCart(updatedCart);
	// };

	// Decrease quantity
	// const handleDecreaseQuantity = (item) => {
	// 	const updatedCart = cart.map((cartItem) => {
	// 		if (cartItem.id === item.id) {
	// 			const newQuantity = Number.isNaN(cartItem.quantity)
	// 				? 0
	// 				: Math.max(cartItem.quantity - 1, 0);
	// 			return { ...cartItem, quantity: newQuantity };
	// 		}
	// 		return cartItem;
	// 	});
	// 	setCart(updatedCart);
	// };
	// Calculate total price
	const totalPrice = cart.reduce(
		(total, item) => total + parseFloat(item.price),
		0
	);
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
								<h1 className="text-success"> Cart Items</h1>
								<div className="float-end" style={{ marginBottom: "10px" }}>
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
													<tr>
														<th></th>
														<th> Name</th>
														<th>Price</th>
														<th>Reviews</th>
														<th>Calories</th>
														<th>Fiber</th>
														<th>Protein</th>
														<th>Carbs</th>
														<th>Actions</th>
													</tr>
												</thead>
												<tbody>
													{cart.map((item) => (
														<tr key={item.id}>
															<td>
																<div>
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
																</div>

																<p className="cart-text text-muted mt-3">
																	<b className="h6"> Description</b>
																	<br />
																	{item.description.slice(0, 50)}...
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

															<td className="text-warning fw-bold">
																{item.review}
															</td>
															<td>{item.calories}</td>
															<td>{item.fiber}</td>
															<td>{item.protein}</td>
															<td>{item.carbs}</td>
															<td>
																<button
																	title="REMOVE"
																	onClick={() => handleRemoveCartItem(item)}
																	className="btn btn-outline-danger"
																>
																	<i className="fa fa-trash"></i>
																</button>
															</td>

															<td>
																{/* <div className="quantity-controls">
															<button
																onClick={() => handleDecreaseQuantity(item)}
																disabled={item.quantity <= 1}
																className="btn btn-outline-secondary"
															>
																<i className="fa fa-minus-circle"> </i>
															</button>
															<span className="quantity ms-2">
																{item.quantity}
															</span>
															<button
																onClick={() => handleIncreaseQuantity(item)}
																className="btn btn-outline-secondary"
															>
																<i className="fa fa-plus-circle"> </i>
															</button>
														</div> */}
																{/* ${calculateSubtotal(item).toFixed(2)} */}
															</td>
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
																	${totalPrice}
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
							</>
						)}
					</div>
				</>
			)}
		</section>
	);
};

export default ShoppingCartComponent;
