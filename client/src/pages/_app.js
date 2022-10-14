import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../index.css";
import "../App.css";
import store from "./store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<div className="App">
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

export default MyApp;
