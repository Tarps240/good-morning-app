// client/src/pages/Register.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post("/api/auth/register", { email, password })
            .then((res) => setMessage(res.data.message))
            .catch((err) => {
                setMessage(err.response?.data?.error || "Error registering");
            });
    };

    return (
        <div className="p-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: "300px" }}>
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
                <button className="btn" type="submit">
                    Register
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;