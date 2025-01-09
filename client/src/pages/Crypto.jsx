import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import CoinCard from "./CoinCard";

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
        navigate(`/crypto/${coinId}`);

        //Option 2 (alternative): toggle some ovelay in state
        //setOverlayCoinId(coinId);
    };

    const handleBuySellClick = (coinId) => {
        // Navigate to a buy/sell screen with the coin's ID or symbol.
        navigate(`/crypto/${coinId}`);
    };

    return (
        <div className="crypto-page">
            <h2 style={{ textAlign: "center" }}>Crypto Markets</h2>
            <div className="coin-list">
                {coins.map((coin) => (
                    <CoinCard
                        key={coin.id}
                        coin={coin}
                        onSwipe={handleSwipe}
                        onBuySellClick={handleBuySellClick}
                    />
                ))}
            </div>
        </div>
   );
}

export default Crypto;