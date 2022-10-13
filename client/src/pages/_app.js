import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";

import store from "../store";
import "../index.css";
import "../App.css";

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
