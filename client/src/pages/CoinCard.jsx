import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
    const [isDragging, setIsDragging] = useState(false);
}


export default CoinCard;