import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
function News() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        axiosInstance
            .get("/api/news")
            .then((res) => {
                // Typically, "res.data.articles" is where NewsAPI stores article array
                setArticles(res.data.articles || []);
                setError("");
            })
            .catch((err) => {
                setError(err.response?.data?.error || "Error fetching news");
            });
    }, []);
    return (
        <div className="news-page">
            <h2 style = {{textAlign: 'center'}}>Top News</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="articles">
                {articles.map((article, idx) => (
                    <div className="article-item" key={idx}>
                        {article.urlToImage && (
                            <img src={article.urlToImage} alt={article.title} width="100" />
                        )}
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        {article.url && (
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;