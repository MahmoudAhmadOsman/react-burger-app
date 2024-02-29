import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FooterComponent from "./footer/FooterComponent";
import Navigation from "./navigation/Navigation";
import HomeComponent from "./home/HomeComponent";
import NotFound from "./utils/NotFound";
import BurgerListComponent from "./burger/BurgerListComponent";
import ShoppingCartComponent from "./cart/ShoppingCartComponent";
import Loading from "./utils/Loading";
import DrinkDetailsComponent from "./drink/DrinkDetailsComponent";
import { CartProvider } from "./context/CartContext";
import BurgerDetailsComponent from "./burger/BurgerDetailsComponent";
import OrderListcomponent from "./order/OrderListcomponent";

function App() {
	const [loading, setLoading] = useState(true);

	// Define an array of route objects
	const routes = [
		{ path: "/cart/shopping/orders", element: <OrderListcomponent /> },
		{ path: "/shopping/shopping-cart", element: <ShoppingCartComponent /> },
		{
			path: "/drinks/view-drink/:id/:name",
			element: <DrinkDetailsComponent />,
		},
		{
			path: "/burgers/view-burger/:id/:name",
			element: <BurgerDetailsComponent />,
		},
		{ path: "/burgers", element: <BurgerListComponent /> },
		{ path: "/", exact: true, element: <HomeComponent /> },
		{ path: "*", element: <NotFound /> },
	];

	// Use .map() to generate <Route> components
	const routeComponents = routes.map((route, index) => (
		<Route
			key={index}
			path={route.path}
			element={route.element}
			exact={route.exact}
		/>
	));

	// Set loading to false when it's done
	// if (loading) {
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 2000);
	// }

	return (
		<CartProvider>
			<BrowserRouter>
				<ToastContainer />

				{loading ? (
					<>
						{" "}
						<Loading />
						{setLoading(false)}
					</>
				) : (
					<>
						<Navigation />
						<React.Fragment>
							<Routes>{routeComponents}</Routes>
						</React.Fragment>
						<FooterComponent />
					</>
				)}
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
