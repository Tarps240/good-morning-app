import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import CoinDetail from "./pages/CoinDetail";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing"
import "./styles/main.scss";
import { useEffect, useState } from "react";


function App() {
  // 'light' / 'dark' / 'auto'
  const [theme, setTheme] = useState("auto");

  // Compute the actual mode => 'light' or 'dark'
  const [actualMode, setActualMode] = useState("dark");

  useEffect(() => {
    function computeMode() {
      if (theme === "light") return "light";
      if (theme === "dark") return "dark";

      const hour = new Date().getHours();
      if (hour >= 7 && hour < 19) {
        return "light";
      } else {
        return "dark";
      }
    }
    setActualMode(computeMode());
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`app ${actualMode}`}>
    <Router>
      {/* Example Nav */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/crypto">Crypto</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/news">News</Link>
        <Link to = "/landing">Landing</Link>
      </nav>

    <div style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
      <button onClick={() => handleThemeChange("light")}>Light Mode</button>
      <button onClick={() => handleThemeChange("dark")}>Dark Mode</button>
      <button onClick={() => handleThemeChange("auto")}>Auto</button>
    </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/crypto/:coinId" element={<CoinDetail />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/news" element={<News />} />
        <Route path = "/landing" element = {<Landing />} />
        {/* Other Routes go here */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;