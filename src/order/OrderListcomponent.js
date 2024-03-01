import React, { useEffect, useState } from "react";
import BurgerService from "../service/BurgerService";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import "./OrderStyle.css";

const OrderListcomponent = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [orderDate, setOrderDate] = useState(0);
	const [orderStatus, setOrderStatus] = useState("Received");

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleImageError = () => {
		setLoading(true);
	};

	const getAllOrders = async () => {
		try {
			await BurgerService.getAllOrders()
				.then((res) => {
					if (Array.isArray(res.data)) {
						const allOrders = res.data.flatMap((order) => order.cart);
						setOrders(allOrders);

						const totalPrice = res.data.reduce(
							(acc, order) => acc + order.totalPrice,
							0
						);
						setTotalPrice(totalPrice);
						setOrderDate(new Date().toLocaleDateString());
						setLoading(false);
					} else {
						throw new Error("Invalid data format");
					}
				})

				.catch((error) => {
					toast.warn(`An Error ${error} has occurred!!`, {
						position: "top-right",
						autoClose: 3000,
					});
					console.log(error.message);
				});
		} catch (error) {
			toast.warn(`An Error ${error} has occurred!!`, {
				position: "top-right",
				autoClose: 3000,
			});
			console.log(error.message);
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			switch (orderStatus) {
				case "Received":
					setTimeout(() => setOrderStatus("Processing"), 2000);
					break;
				case "Processing":
					setTimeout(() => setOrderStatus("Shipped"), 2000);
					break;
				case "Shipped":
					setTimeout(() => setOrderStatus("Delivered"), 2000);
					break;
				case "Delivered":
					setTimeout(() => setOrderStatus("Completed"), 2000);
					break;
				case "Completed":
					clearInterval(interval);
					break;
				default:
					break;
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [orderStatus]);

	const getIconClass = () => {
		switch (orderStatus) {
			case "Processing":
				return "fa fa-circle-o-notch";
			case "Shipped":
				return "fa fa-truck";
			case "Delivered":
				return "fa fa-truck";
			case "Completed":
				return "fa fa-check-circle";
			default:
				return "fa fa-first-order";
		}
	};
	return (
		<div className="order-list container">
			{loading ? (
				<div>
					<Loading />
				</div>
			) : (
				<>
					<div className="row mt-4">
						{orders.length === 0 ? (
							<span></span>
						) : (
							<div className="mb-3">
								<h1 className="text-success">Your Order List</h1>
								<hr />
							</div>
						)}

						{orders.length === 0 ? (
							<div className="alert alert-danger mt-4">
								<h3 className="text-center">
									No Orders Yet. Please Submit a New Order
								</h3>
							</div>
						) : (
							<>
								<div className="table-responsive  shadow-lg p-3 mb-5 bg-body rounded">
									<table className="table table-striped table-hover table-bordered table-sm ">
										<thead>
											<tr>
												<th scope="col">Item #</th>
												<th scope="col">Name</th>
												<th scope="col">Image</th>
												<th scope="col">Price</th>
												<th scope="col">Description</th>
												<th scope="col">Order Status</th>
												<th scope="col">Order Date</th>
											</tr>
										</thead>
										<tbody>
											{orders.map((order, index) => (
												<tr key={order.id}>
													<th scope="row">{index + 1}</th>
													<td>{order.name}</td>
													<td className="order-image">
														{order.meal_img ? (
															<img
																src={order.meal_img}
																className="img-fluid"
																alt={order.name}
																onLoad={handleImageLoad}
																onError={handleImageError}
															/>
														) : (
															<img
																src={order.drink_image}
																className="img-fluid"
																alt={order.name}
																onLoad={handleImageLoad}
																onError={handleImageError}
															/>
														)}
													</td>
													<td>
														<b className="text-danger fw-bold">
															${order.price}
														</b>
													</td>
													<td className="text-muted">
														{order.description.slice(0, 48)}...
													</td>
													<td>
														{order && (
															<div className="text-center">
																{/* <span
																	className={`text-${
																		orderStatus === "Processing"
																			? "success"
																			: "info"
																	}`}
																>
																	<i className={getIconClass()}></i>{" "}
																	{orderStatus}
																</span> */}
																<span>
																	{orderStatus === "Received" && (
																		<b className="bg-info text-light text-uppercase p-1">
																			<i
																				className={`bg-white text-dark p-1 ${getIconClass()}`}
																			></i>
																			&nbsp; | &nbsp;
																			{orderStatus}
																		</b>
																	)}
																	{orderStatus === "Processing" && (
																		<b className="bg-dark text-light text-uppercase p-1">
																			<i
																				className={`bg-white text-dark p-1 ${getIconClass()}`}
																			></i>
																			&nbsp; | &nbsp;
																			{orderStatus}
																		</b>
																	)}
																	{orderStatus === "Shipped" && (
																		<b className="bg-warning text-light text-uppercase p-1">
																			<i
																				className={`bg-white text-dark p-1 ${getIconClass()}`}
																			></i>
																			&nbsp; | &nbsp;
																			{orderStatus}
																		</b>
																	)}
																	{orderStatus === "Delivered" && (
																		<b className="bg-dark text-light text-uppercase p-1">
																			<i
																				className={`bg-white text-dark p-1 ${getIconClass()}`}
																			></i>
																			&nbsp; | &nbsp;
																			{orderStatus}
																		</b>
																	)}
																	{orderStatus === "Completed" && (
																		<b className="bg-success text-light text-uppercase p-1">
																			<i
																				className={`bg-white text-dark p-1 ${getIconClass()}`}
																			></i>
																			&nbsp; | &nbsp;
																			{orderStatus}
																		</b>
																	)}
																</span>
															</div>
														)}
													</td>
													<td>
														<span className="text-warning">{orderDate}</span>
													</td>
												</tr>
											))}
										</tbody>
										<caption>Number of ordered items: {orders.length}</caption>
									</table>
								</div>
							</>
						)}

						{/* Total price */}
						{orders.length > 0 ? (
							<div>
								<h1 className="float-end bg-light p-3 shadow-lg p-3 mb-5 rounded">
									Total Price:{" "}
									<b className="text-danger">${totalPrice.toFixed(2)}</b>
								</h1>
							</div>
						) : null}
					</div>
				</>
			)}
		</div>
	);
};

export default OrderListcomponent;
