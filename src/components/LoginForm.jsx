import React, { useState } from "react";
import { Input } from "antd";
import MyButton from "./UI/button/MyButton";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Login:", login);
		console.log("Password:", password);
		setLogin("");
		setPassword("");
		navigate("/dashboard");
	};

	// На кнопку сабмита мы просто переходим на новый роут где находится дэшбоард с клиентами и другими вкладками которые можно будет наколнить контентом
	// Импуты можно было сделать такими же компонентами личной UI библиотеки как и кнопку. Думаю что на проекте будет собственная UI библиотека
	return (
		<form onSubmit={handleSubmit}>
			<label>
				Login:
				<Input
					type="text"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<Input.Password
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<MyButton onClick={handleSubmit}>SIGN IN</MyButton>
		</form>
	);
}

export default Login;
