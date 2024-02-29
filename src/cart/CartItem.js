import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ cart }) => {
	return (
		<div>
			{cart.length > 0 && (
				<>
					<Link to="/shopping/shopping-cart">
						<button type="button" className="btn btn-dark position-relative">
							<i className="fa fa-shopping-cart" aria-hidden="true"></i>
							&nbsp;
							<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
								{cart.length}
							</span>
						</button>
					</Link>
				</>
			)}
		</div>
	);
};

export default CartItem;
