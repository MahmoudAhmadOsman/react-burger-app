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
  const [imageLoadStates, setImageLoadStates] = useState({});

  const handleImageLoad = (id) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [id]: "loaded",
    }));
  };

  const handleImageError = (id) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [id]: "error",
    }));
  };

  const getAllOrders = async () => {
    try {
      setLoading(true);
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

            // Initialize image load states
            const initialLoadStates = {};
            allOrders.forEach((order) => {
              initialLoadStates[order.id] = "loading";
            });
            setImageLoadStates(initialLoadStates);
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
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.warn(`An Error ${error} has occurred!!`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error.message);
      setLoading(false);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Received":
        return { class: "info", icon: "fa-shopping-basket" };
      case "Processing":
        return { class: "primary", icon: "fa-cog fa-spin" };
      case "Shipped":
        return { class: "warning", icon: "fa-truck" };
      case "Delivered":
        return { class: "dark", icon: "fa-check-circle" };
      case "Completed":
        return { class: "success", icon: "fa-check-circle" };
      default:
        return { class: "secondary", icon: "fa-question-circle" };
    }
  };

  const statusBadge = getStatusBadge(orderStatus);

  return (
    <div className="container py-4">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <div className="row">
            {orders.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-warning text-center py-4">
                  <h3 className="mb-3">
                    <i className="fa fa-shopping-cart fa-2x me-2"></i>
                    No Orders Yet
                  </h3>
                  <p className="lead">
                    Please submit a new order to see it here
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="col-12 mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-success mb-0">
                      <i className="fa fa-list-alt me-2"></i>
                      Your Order List
                    </h1>
                    <div className="d-flex align-items-center">
                      <div
                        className={`badge bg-${statusBadge.class} text-white px-3 py-2 me-3`}
                      >
                        <i className={`fa ${statusBadge.icon} me-2`}></i>
                        {orderStatus}
                      </div>
                      <div className="text-muted">
                        <i className="fa fa-calendar me-2"></i>
                        {orderDate}
                      </div>
                    </div>
                  </div>
                  <hr className="mt-3" />
                </div>

                <div className="col-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th scope="col" className="text-center">
                                #
                              </th>
                              <th scope="col">Item</th>
                              <th scope="col" className="text-center">
                                Image
                              </th>
                              <th scope="col" className="text-end">
                                Price
                              </th>
                              <th scope="col">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, index) => (
                              <tr key={order.id}>
                                <th scope="row" className="text-center">
                                  {index + 1}
                                </th>
                                <td className="fw-bold">{order.name}</td>
                                <td className="text-center">
                                  <div className="order-image-container">
                                    {imageLoadStates[order.id] ===
                                      "loading" && (
                                      <div className="image-loading">
                                        <Loading small />
                                      </div>
                                    )}
                                    {order.meal_img ? (
                                      <img
                                        src={order.meal_img}
                                        className={`img-thumbnail ${
                                          imageLoadStates[order.id] === "loaded"
                                            ? "visible"
                                            : "invisible"
                                        }`}
                                        alt={order.name}
                                        onLoad={() => handleImageLoad(order.id)}
                                        onError={() =>
                                          handleImageError(order.id)
                                        }
                                      />
                                    ) : (
                                      <img
                                        src={order.drink_image}
                                        className={`img-thumbnail ${
                                          imageLoadStates[order.id] === "loaded"
                                            ? "visible"
                                            : "invisible"
                                        }`}
                                        alt={order.name}
                                        onLoad={() => handleImageLoad(order.id)}
                                        onError={() =>
                                          handleImageError(order.id)
                                        }
                                      />
                                    )}
                                    {imageLoadStates[order.id] === "error" && (
                                      <div className="image-error">
                                        <i className="fa fa-image text-muted"></i>
                                        <span className="d-block small">
                                          Image not available
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="text-end text-danger fw-bold">
                                  ${order.price}
                                </td>
                                <td className="text-muted">
                                  {order.description.slice(0, 60)}...
                                  <button
                                    className="btn btn-sm btn-link p-0 ms-2"
                                    data-bs-toggle="tooltip"
                                    title={order.description}
                                  >
                                    <i className="fa fa-info-circle"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted">
                          <i className="fa fa-cubes me-2"></i>
                          Total Items: <strong>{orders.length}</strong>
                        </div>
                        <div className="d-flex align-items-center">
                          <h5 className="mb-0 me-3">Total:</h5>
                          <h3 className="text-danger mb-0">
                            <strong>${totalPrice.toFixed(2)}</strong>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                      <h4 className="mb-4">
                        <i className="fa fa-truck me-2"></i>
                        Order Status Timeline
                      </h4>
                      <div className="progress-container">
                        <div className="progress">
                          <div
                            className={`progress-bar progress-bar-striped bg-${statusBadge.class}`}
                            role="progressbar"
                            style={{
                              width:
                                orderStatus === "Received"
                                  ? "20%"
                                  : orderStatus === "Processing"
                                  ? "40%"
                                  : orderStatus === "Shipped"
                                  ? "60%"
                                  : orderStatus === "Delivered"
                                  ? "80%"
                                  : "100%",
                            }}
                            aria-valuenow={
                              orderStatus === "Received"
                                ? 20
                                : orderStatus === "Processing"
                                ? 40
                                : orderStatus === "Shipped"
                                ? 60
                                : orderStatus === "Delivered"
                                ? 80
                                : 100
                            }
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="timeline-steps">
                          <div
                            className={`timeline-step ${
                              orderStatus === "Received" ? "active" : ""
                            }`}
                          >
                            <div className="timeline-content">
                              <i className="fa fa-shopping-basket text-info"></i>
                              <p className="mb-0">Received</p>
                            </div>
                          </div>
                          <div
                            className={`timeline-step ${
                              orderStatus === "Processing" ? "active" : ""
                            }`}
                          >
                            <div className="timeline-content">
                              <i className="fa fa-cog text-primary"></i>
                              <p className="mb-0">Processing</p>
                            </div>
                          </div>
                          <div
                            className={`timeline-step ${
                              orderStatus === "Shipped" ? "active" : ""
                            }`}
                          >
                            <div className="timeline-content">
                              <i className="fa fa-truck text-warning"></i>
                              <p className="mb-0">Shipped</p>
                            </div>
                          </div>
                          <div
                            className={`timeline-step ${
                              orderStatus === "Delivered" ? "active" : ""
                            }`}
                          >
                            <div className="timeline-content">
                              <i className="fa fa-check-circle text-dark"></i>
                              <p className="mb-0">Delivered</p>
                            </div>
                          </div>
                          <div
                            className={`timeline-step ${
                              orderStatus === "Completed" ? "active" : ""
                            }`}
                          >
                            <div className="timeline-content">
                              <i className="fa fa-check-circle text-success"></i>
                              <p className="mb-0">Completed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListcomponent;
