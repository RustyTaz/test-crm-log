import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashBoardPage from "./pages/DashBoardPage";
import ClientsTable from "./components/ClientsTable.tsx";
//import ClientsTable from "./components/ClientsTable";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/dashboard" element={<DashBoardPage />}>
					<Route
						path="home"
						element={<h1>Welcome to DashBoard</h1>}
					/>
					<Route path="contacts" element={<ClientsTable />} />
					<Route path="calendar" element={<h1>Calendar</h1>} />
					<Route
						path="proj-report"
						element={<h1>Project Report</h1>}
					/>
					<Route path="" element={<h1>Welcome to DashBoard</h1>} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
