import React from "react";
import "./LoadingStyle.css";

const Loading = () => {
	return (
		<section className="loading-template">
			<div className="items">
				<img src="/loading.svg" alt="Loading!" />
				<h1 className="text-muted">Loading...</h1>
			</div>
		</section>
	);
};

export default Loading;
