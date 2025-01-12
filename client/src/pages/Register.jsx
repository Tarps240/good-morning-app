import { useState } from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // Get existing users from LocalStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            setMessage("User already exists.");
            return;
        }

        // Create a new user object
        const newUser = { email, password };

        // Push to array and store in localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setMessage("User registered successfully!");

        // Optionally clear fields
        setEmail("");
        setPassword("");
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>                
                <div>
                    <label htmlFor="register-email">Email:</label>
                    <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Password:</label>
                    <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;