import { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import Clarifai from "clarifai";
import SignIn from "./components/signin/SignIn";
import Register from "./components/register/Register";

const app = new Clarifai.App({
	apiKey: "c224c3964124468c83ab16bfdbd1234e",
});

function App() {
	const [input, setInput] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [box, setBox] = useState({});
	const [route, setRoute] = useState("signin");
	const [signedIn, setSignedIn] = useState(false);

	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	const onSubmit = () => {
		setImageUrl(input);
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, input)
			.then((response) => displayFaceBox(calcFaceLocation(response)))
			.catch((error) => console.log(error));
	};

	const calcFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImg");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	const displayFaceBox = (box) => {
		setBox(box);
	};

	const onRouteChange = (route) => {
		if (route === "signout") {
			setSignedIn(false);
		} else if (route === "home") {
			setSignedIn(true);
		}
		setRoute(route);
	};

	return (
		<div className="App">
			<Navigation onRouteChange={onRouteChange} isSignedIn={signedIn} />
			{route === "home" ? (
				<div>
					{" "}
					<Logo />
					<Rank />
					<ImageLinkForm
						onInputChange={onInputChange}
						onButtonSubmit={onSubmit}
					/>
					<FaceRecognition box={box} imageUrl={imageUrl} />
				</div>
			) : route === "signin" ? (
				<SignIn onRouteChange={onRouteChange} />
			) : (
				<Register onRouteChange={onRouteChange} />
			)}
		</div>
	);
}

export default App;
