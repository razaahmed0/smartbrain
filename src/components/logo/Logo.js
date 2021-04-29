import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import brain from "./brain.png";

function Logo() {
	return (
		<div className="ma4 mt0">
			<Tilt
				className="Tilt br2 shadow-2"
				options={{ max: 35 }}
				style={{ height: 150, width: 150 }}>
				<div className="Tilt-inner">
					{" "}
					<img src={brain} alt="logo" />{" "}
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;
