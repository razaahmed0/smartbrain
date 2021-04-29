import React from "react";
import "./facerecognition.css";

function FaceRecognition({ box, imageUrl }) {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img src={imageUrl} alt="" width="500px" height="auto" id="inputImg" />
				<div
					className="bounding_box"
					style={{
						top: box.topRow,
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol,
					}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;
