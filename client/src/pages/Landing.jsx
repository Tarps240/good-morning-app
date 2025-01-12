
import { useState, useEffect, useRef, Link } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sunshine.css';
import '../styles/main.scss'


function LandingPage() {
    const [circularButton, setCircularButton] = useState(false);
    const [text, setText] = useState("Good Morning!");
    const [navBarVisible, setNavBarVisible] = useState(false);

    const buttonRef = useRef(null)
 
    const navigateTo = useNavigate();
    
    useEffect(() => {
        const delay = setTimeout(() => {
            setText(" ");
            setCircularButton(true);

            if(buttonRef.current) {
                buttonRef.current.style.opacity = 0;
            
        setTimeout(() => {
            if(buttonRef.current) {
                buttonRef.current.style.opacity = 1;
                }
            }, 200);
            }
        }, 3000);
    
    return () => clearTimeout(delay);
    }, []);


const clickButton = () => {
    setNavBarVisible(true)
    navigateTo("/login");
};

return (
    <div className = "landing-page">
    <div className = "circle">
        <h1 id = "first-message">{text}</h1>
        {circularButton && (
            <button
                id = "second-message"
                ref = {buttonRef}
                onClick = {clickButton}
                style = {{display: "inline-block"}}
            >Click Here to Get Your Day Started!
            </button>
        )}
    </div>
    {navBarVisible && (
      <nav className="navbar">
        <Link to = "/">Landing</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/crypto">Crypto</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/news">News</Link>
      </nav>
      )}
    </div>
);
};

export default LandingPage;



