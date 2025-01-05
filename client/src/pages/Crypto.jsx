import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Crypto() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axiosInstance
            .get("/api/crypto")
            .then((res) => setCoins(res.data))
            .catch((err) => setError(err.response?.data?.error || "Error fetching crypto data"));
    }, []);

    return (
        <div className="crypto-page">
            <h2>Crypto Markets</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="coin-list">
                {coins.map((coin) => (
                    <div className="coin-item" key={coin.id}>
                        <img src={coin.image} alt={coin.name} width="30" />
                        <h3>{coin.name}</h3>
                        <p>Price: ${coin.current_price}</p>
                        <p>Market Cap: ${coin.market_cap}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Crypto;