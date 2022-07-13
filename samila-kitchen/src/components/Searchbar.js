import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Searchbar.css";

export default function Searchbar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search?q=${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Pencarian</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
}
