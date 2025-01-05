import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function Crypto() {
    const [coins, setCoins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/api/crypto")
            .then((res) => setCoins(res.data))
            .catch((err) => console.error("Crypto error:", err));
    }, []);

    // Handler for when a coin is swiped.
    const handleSwipe = (coinId) => {
        // Option 1: navigate directly to trade route
        navigate(`/crypto/${coinId}/trade`);

        //Option 2 (alternative): toggle some ovelay in state
        //setOverlayCoinId(coinId);
    };

    const handleBuySellClick = (coinId) => {
        // Navigate to a buy/sell screen with the coin's ID or symbol.
        navigate(`/crypto/${coinId}/trade`);
    };

    return (
        <div className="crypto-page">
            <h2 style={{ textAlign: "center" }}>Crypto Markets</h2>
            <div className="coin-list">
                {coins.map((coin) => {
                    // Set up swipe handlers for each card
                    const swipeHandlers = useSwipeable({
                        //We'll consider a left or right swipe triggers the same action
                        onSwipedLeft: () => handleSwipe(coin.id),
                        onSwipedRight: () => handleSwipe(coin.id),
                        // Optional configurations
                        trackMouse: true, // let swiping work with mouse drag on desktop
                });

                return (
                    <div 
                        className="coin-card" 
                        key={coin.id}
                        {...swipeHandlers}
                    >
                        <img src={coin.image} alt={coin.name} />
                        <h3>{coin.name}</h3>
                        <p>Price: ${coin.current_price}</p>
                        <p>Market Cap: ${coin.market_cap}</p>

                        {/* Overlay or button to go to Buy/Sell */}
                        <div
                            className="overlay-button"
                            onClick={() => handleBuySellClick(coin.id)}
                        >
                           Buy/Sell 
                        </div>
                    </div>
                );
                })};
            </div>
        </div>
   );
}

export default Crypto;