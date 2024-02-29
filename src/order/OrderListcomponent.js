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
					setOrderStatus("Processing");
					break;
				case "Processing":
					setOrderStatus("Shipping");
					break;
				case "Shipping":
					setOrderStatus("Delivering");
					break;
				case "Delivering":
					setOrderStatus("Completed");
					break;
				case "Completed":
					clearInterval(interval);
					break;
				default:
					break;
			}
		}, 100000);  

		return () => clearInterval(interval);
	}, [orderStatus]); // Trigger effect whenever orderStatus changes
	const getIconClass = () => {
		switch (orderStatus) {
			case "Processing":
				return "fa fa-refresh fa-spin"; // example icon class for processing
			case "Shipping":
				return "fa fa-truck"; // example icon class for shipping
			case "Delivering":
				return "fa fa-truck"; // example icon class for delivering
			case "Completed":
				return "fa fa-check-circle"; // example icon class for completed
			default:
				return "";
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
																<span
																	className={`text-${
																		orderStatus === "Processing"
																			? "success"
																			: "info"
																	}`}
																>
																	<i className={getIconClass()}></i>{" "}
																	{orderStatus}
																</span>
																{/* <span
																	className={`text-${
																		orderStatus === "Processing"
																			? "success"
																			: "info"
																	}`}
																>
																	{orderStatus}
																</span> */}
															</div>
														)}
													</td>
													<td>
														<span className="text-warning">{orderDate}</span>
													</td>
												</tr>
											))}
										</tbody>
										<caption>Number of order items {orders.length}</caption>
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
