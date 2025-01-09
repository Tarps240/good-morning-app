// client/src/pages/CoinDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Sparklines, SparklinesLine } from "react-sparklines";

function CoinDetail() {
    const { coinId } = useParams();
    const navigate = useNavigate();
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get(`/api/crypto/${coinId}`) // or another endpoint
            .then((res) => {
                setCoinData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching coin detail:", err);
                setLoading(false);
            });
    }, [coinId]);

    if (loading) return <div>Loading coin data...</div>;
    if (!coinData) return <div>No data found for {coinId}</div>;

    /**
     * 1) coinData.market_data.current_price.usd, etc.
     * 2) For historical chart data, coinData might have `market_chart.prices`
     *    which is typically an array of arrays: [[timestamp, price], [timestamp, price], ...].
     *    We only want the price at index 1 from each sub-array.
     */
    // Safely extract the array
    const historical = coinData.market_chart?.prices ?? [];

    // Convert [[timestamp, price], ...] to [price, price, ...]
    const chartData = historical.map(point => point[1]);

    // Suppose coinData has a "prices" array for the last 30 days, etc.
    return (
        <div style={{ backgroundColor: "#1B1E2F", color: "#FFF", minHeight: "100vh", padding: "1rem" }}>
            <button
                onClick={() => navigate("/crypto")}
                style={{
                    padding: "0.5rem 1rem",
                    marginBottom: "1rem",
                    backgroundColor: "#272B41",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Back
            </button>


            <h1>{coinData.name} Details</h1>
            <p>Current price: ${coinData.market_data?.current_price?.usd}</p>
            <p>Market cap: ${coinData.market_data?.market_cap?.usd}</p>

            <h2>Historical Chart: Last 30 Days</h2>
            {/* Use chartdata which is just an array of the prices. */}
            {chartData.length > 0 ? (
                <Sparklines data={chartData} width={200} height={80}>
                    <SparklinesLine style={{ strokeWidth: 1, fill: "none" }} color="#38D39F" />
                </Sparklines>
            ) : (
                <p>No Historical data available.</p>
            )}

            {/* Add more details: volume, supply, etc. */}
        </div>
    );
}

export default CoinDetail;