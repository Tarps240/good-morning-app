import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparklines, SparklinesLine } from "react-sparklines";

function formatMarketCap(value) {
    if (!value) return "";
    if (value >= 1e9) {
        return (value / 1e9).toFixed(3) + " Bn";
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(3) + " M";
    }
    return value.toString();
}

function CoinCard({ coin }) {
    const navigate = useNavigate();
    const sparkData = coin.sparkline_in_7d?.price || [];
    const [isDragging, setIsDragging] = useState(false);

    // Called if user swipes beyond a threshold or releases the drag.
    const handleDragEnd = (event, info) => {
        // info.offset.x = total distance dragged horizontally
        if (Math.abs(info.offset.x) > 100) {
            // If dragged significantly left or right => navigate
            navigate(`/crypto/${coin.id}`);
        } else {
            // Otherwise, do nothing special
        }
        setIsDragging(false);
    };

    const handleClick = () => {
        if (!isDragging) {
            // If the user didnt start a drag, then register a normal click.
            navigate(`/crypto/${coin.id}`);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="coin-card"
                onClick={handleClick}
                drag="x" // allows horizontal drag
                dragConstraints={{ left: 0, right: 0 }} // basic constraint
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
            
                {/* Left side: logo + name */}
                <div className="coin-left">
                    <img src={coin.image} alt={coin.name} className="coin-logo" />
                    <div className="coin-info">
                        <div className="coin-name">{coin.name}</div>
                        <div className="coin-symbol-rank">
                        {coin.market_cap_rank} {coin.symbol?.toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Middle: small sparkline or chart image */}
                <div className="coin-chart">
                    {sparkData.length > 0 ? (
                        <Sparklines data={sparkData} width={15} height={5}>
                            <SparklinesLine
                                style={{ strokeWidth: 0.04, fill: "none" }}
                                color={
                                    coin.price_change_percentage_24h >= 0
                                    ? "#38D39F" // green
                                    : "#F5475B" // red
                                }
                            />
                        </Sparklines>
                    ) : (
                       <div style={{ width: "60px", height: "30px" }} /> 
                    )}
                </div>

                {/* Right side: price info + 24h changes */}
                <div className="coin-price">
                    <div className="price">${coin.current_price}</div>
                    <div className="mcap">MCap {formatMarketCap(coin.market_cap)}</div>
                </div>

                <div
                    className={
                        "coin-change " +
                        (coin.price_change_percentage_24h >= 0 ? "positive" : "negative")
                    }
                >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
            </motion.div>
        </AnimatePresence>
    );
}


export default CoinCard;