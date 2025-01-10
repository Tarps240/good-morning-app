// client/src/pages/CoinDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Sparklines, SparklinesLine } from "react-sparklines";

// Import Recharts
import { 
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

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
    const chartData = historical.map(([ts, p]) => ({
        time: new Date(ts).toLocaleDateString("en-US"),
        price: p
    }));

    // Suppose coinData has a "prices" array for the last 30 days, etc.
    return (
        <div style={{ backgroundColor: "#1B1E2F", color: "#FFF", minHeight: "100vh", padding: "1rem" }}>
            


            <h1>{coinData.name} Details</h1>
            <p>Current price: ${coinData.market_data?.current_price?.usd}</p>
            <p>Market cap: ${coinData.market_data?.market_cap?.usd}</p>

            <h2>Historical Chart: Last 30 Days</h2>
            {/* Use chartdata which is just an array of the prices. */}
            {chartData.length > 0 ? (
                <div style={{ width: "100%", height: "300px", backgroundColor: "#272B41", borderRadius: "6px", padding: "1rem" }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="time" stroke="#CCC" />
                            <YAxis stroke="#CCC" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#333", border: "none" }}
                                labelStyle={{ color: "#FFF" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#38D39F"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
              <p>No Historical data available.</p>
            )}
            
            <button
                onClick={() => navigate("/crypto")}
                style={{
                    padding: "0.5rem 1rem",
                    marginTop: "1rem",
                    backgroundColor: "#272B41",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Back
            </button>

            {/* Add more details: volume, supply, etc. */}
        </div>
    );
}

export default CoinDetail;