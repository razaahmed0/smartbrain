import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Clarifai from "clarifai";

const app = new Clarifai.App({
	apiKey: "c224c3964124468c83ab16bfdbd1234e",
});

function App() {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const onSubmit = () => {
		setImageUrl(input);
		app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
			function (response) {
				console.log(
					response.outputs[0].data.regions[0].region_info.bounding_box
				);
			},
			function (err) {
				// body
			}
		);
	};

	return (
		<div className="App">
			<Navigation />
			<Logo />
			<Rank />
			<ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onSubmit} />
			<FaceRecognition imageUrl={imageUrl} />
		</div>
	);
}

export default App;
