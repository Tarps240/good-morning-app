// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Read localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Find user with matching email
        const foundUser = users.find(u => u.email === email);

        if (!foundUser) {
            setMessage("User does not exist.");
            return;
        }

        // Compare password
        if (foundUser.password !== password) {
            setMessage("Invalid credentials.");
            return;
        }

        // If valid, store a "Logged in user" in localStorage.
        localStorage.setItem("loggedInUser", email);
        setMessage("Login successful!");

        // Auto redirect to Home page ("/") or any other route
        navigate("/")
    };

    return (
        <div className="login-container">
            <div className="login">
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="login-email">Email: </label>
                    <input
                        className="block"
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="login-password">Password: </label>
                    <input
                        className="block"
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn" type="submit" style={{ fontSize: "25px" }}>Login</button>
                <br/>
                <h3>Or</h3>
                <h3>Click the button below to create an account</h3>
                <button className="btn" type="button" style={{ fontSize: "25px" }}>
                    Create Account
                </button>
            </form>
        </div>
        </div>
    );
}

export default Login;