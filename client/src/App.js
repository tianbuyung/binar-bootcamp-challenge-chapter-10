import "./App.css";
import routes from "./routes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.page} />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
