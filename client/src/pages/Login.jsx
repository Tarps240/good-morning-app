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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {message && <p>{message}</p>}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );

}

export default Login;