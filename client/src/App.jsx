import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/Landing"
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

   return (
    <Router>
      {/* Links also moved to LandingPage component, to hide nav bar when loading page*/}
        
      <nav className="navbar">
        <Link to = "/">Landing</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/crypto">Crypto</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/news">News</Link>
      </nav>
      
      <Routes>
        {/*root route*/}
        <Route path = "/" element = {<LandingPage />} />
        
        {/* Other Routes go here */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
};

export default App;