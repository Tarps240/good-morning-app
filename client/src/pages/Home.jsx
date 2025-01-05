// src/pages/Home.jsx
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">
            <h2>Welcome to the Good Morning App!</h2>
            <p>
                Choose one of the sections below to get your daily updates:
            </p>
            <div className="home-links">
                <Link to="/crypto" className="home-link">Crypto</Link>
                <Link to="/news" className="home-link">News</Link>
                <Link to="/weather" className="home-link">Weather</Link>
            </div>
        </div>
    );
}

export default Home;