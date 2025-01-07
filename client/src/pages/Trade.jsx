import { useParams } from "react-router-dom";

function Trade() {
    const { coinId } = useParams();

    return (
        <div style={{ color: "#fff", backgroundColor: "#1B1E2F", height: "100vh", padding: "1rem" }}>
            <h1>Trade {coinId}</h1>
            {/* Show forms or details... */}
        </div>
    );
}

export default Trade;