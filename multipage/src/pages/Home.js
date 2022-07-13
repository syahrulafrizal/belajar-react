import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

// styles
import "./Home.css";

export default function Home() {
  const { data, isPending, error } = useFetch("http://localhost:2599/articles");

  return (
    <div className="home">
      <h2>Articles</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data &&
        data.map((article) => (
          <div key={article.id} className="card">
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <Link to={`/articles/${article.id}`}>Read more...</Link>
          </div>
        ))}
    </div>
  );
}
