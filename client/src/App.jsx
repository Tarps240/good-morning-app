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

  // Track the logged in user from localStorage
  const [loggedInUser, setLoggedInUser] = useState(null);

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

  // On app load, check if theres a loggedinuser in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLogOut = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <div className={`app ${actualMode}`}>
    <Router>
      {/* Example Nav */}
      <nav className="navbar">
            <Link to = "/landing">Landing</Link>
        
        {/* If user not logged in, show Login/Register links */}
        {!loggedInUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        
        {/* If user is logged in, show other links */}
        {loggedInUser && (
          <>
            <Link to="/">Home</Link>
            <Link to="/crypto">Crypto</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/news">News</Link>
            <button onClick={handleLogOut} style={{ marginLeft: "1rem" }}>
              Logout
            </button>
          </>
        )}        
      </nav>

    <div style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
      <button onClick={() => handleThemeChange("light")}>Light Mode</button>
      <button onClick={() => handleThemeChange("dark")}>Dark Mode</button>
      <button onClick={() => handleThemeChange("auto")}>Auto</button>
    </div>
      
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes: only show if user is logged in */}
        {loggedInUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/crypto/:coinId" element={<CoinDetail />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/news" element={<News />} />
          </>
        )};        
        {/* If user tries to go to a protected route while not logged in, 
              you could redirect them to /login or show a 404. 
              For now, do nothing special. */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;