
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import '../styles/sunshine.css';

function LandingPage() {
    const [circularButton, setCircularButton] = useState(false);
    const [text, setText] = useState("Good Morning!");
    const buttonRef = useRef(null)
    
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
    window.location.href = "./pages/Home";
};

return (
    <div id = "circle" className = "landing-page">
        <h1 id = "first-message">{text}</h1>
        {circularButton && (
            <button
                id = "second-message"
                ref = {buttonRef}
                onClick = {clickButton}
                style = {{display: "inline-block"}}
            >Click Here to Get YOur Day Started!
            </button>
        )}
    </div>
);
};

export default LandingPage;



