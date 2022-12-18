import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute/HomeRoute";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<HomeRoute />
			</BrowserRouter>
		</div>
	);
}

export default App;
