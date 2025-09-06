import React from "react";
import "./LoadingStyle.css";

const Loading = () => {
	return (
		<div className="loading-container d-flex justify-content-center align-items-center min-vh-100">
			<div className="loading-content text-center">
				<div className="loading-spinner-wrapper mb-4">
					<div className="loading-spinner">
						<i className="fa fa-spinner fa-spin loading-icon" aria-hidden="true"></i>
					</div>
				</div>
				<div className="loading-text">
					<h3 className="text-primary mb-2 fw-light">Loading</h3>
					<p className="text-muted mb-0 small">Please wait while we prepare your content...</p>
				</div>
				<div className="loading-dots mt-3">
					<span className="dot dot-1"></span>
					<span className="dot dot-2"></span>
					<span className="dot dot-3"></span>
				</div>
			</div>
		</div>
	);
};

export default Loading;
