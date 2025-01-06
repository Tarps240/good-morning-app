import React from "react";
import { useSwipeable } from "react-swipeable";

function CoinCard({ coin, onSwipe, onBuySellClick }) {
    // Call Hook *outside* of map, at component's top level
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => onSwipe(coin.id),
        onSwipedRight: () => onSwipe(coin.id),
        trackMouse: true,
    });

    return (
        <div className="coin-card" {...swipeHandlers}>
            <img src={coin.image} alt={coin.name} />
            <
        </div>
    )

}