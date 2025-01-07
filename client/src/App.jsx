import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Trade from "./pages/Trade";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      {/* Example Nav */}
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/crypto">Crypto</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/news">News</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/cypto/:coinId/trade" element={<Trade />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/news" element={<News />} />
        {/* Other Routes go here */}
      </Routes>
    </Router>
  );
};

export default App;