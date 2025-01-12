// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    
    const handleLogin = (e) => {
        e.preventDefault();
        axiosInstance
        .post("/api/auth/login", { email, password })
        .then((res) => {
            // Save token in LocalStorage
            localStorage.setItem("jwt", res.data.token);
            setError("");
            alert("Login successful!");
            navigate("/");
        })
        .catch((err) => {
            setError(err.response?.data?.error || "Login error");
        });
    };

    

    const createAccountHandle = () => {
        navigate("/register");
    }

    return (
        <div id  = "login-container">
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        className="block"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        className="block"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn" type="submit" style = {{fontSize: "25px"}}>
                    Login
                </button>
                <br/>
                <h3>Or</h3>
                <h3>Click the button below to create an account</h3>
                <button className="btn" type="button" onClick = {createAccountHandle} style = {{fontSize: "25px"}}>
                    Create Account
                </button>
            </form>
            {error && <p style={{ color: "red"}}>{error}</p>}
        </div>
        </div>
    );
}

export default Login;