import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<DashBoardPage />} />
			</Routes>
		</Router>
	);
}

export default App;
