import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [coockingTime, setCoockingTime] = useState("");
  const [ingredients, setIngeridients] = useState([]);
  const [newIngeridient, setNewIngeridient] = useState("");
  const bahanInput = useRef(null);
  const { postData, error, isPending, data } = useFetch(
    "http://localhost:2599/recipes",
    "POST"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, coockingTime, ingredients);

    postData({
      title,
      method,
      coockingTime: `${coockingTime} minute`,
      ingredients,
    });

    console.log(data);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const bahan = newIngeridient.trim();
    if (bahan && !ingredients.includes(bahan)) {
      setIngeridients((prevIng) => [...prevIng, bahan]);
    }
    setNewIngeridient("");
    bahanInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Tambah Resep</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nama Resep</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Bahan</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngeridient(e.target.value)}
              value={newIngeridient}
              ref={bahanInput}
            />
            <button type="button" onClick={handleAdd} className="btn">
              Tambah
            </button>
          </div>
        </label>
        <p>
          Bahan :{" "}
          {ingredients &&
            ingredients.map((bahan) => <em key={bahan}>{bahan}, </em>)}
        </p>
        <label>
          <span>Cara Memasak</span>
          <textarea
            type="text"
            onChange={(e) => setMethod(e.target.value)}
            value={method}
          />
        </label>
        <label>
          <span>Waktu Memasak</span>
          <input
            type="number"
            onChange={(e) => setCoockingTime(e.target.value)}
            value={coockingTime}
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
