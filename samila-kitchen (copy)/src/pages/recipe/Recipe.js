import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = `http://localhost:2599/recipes/${id}`;
  const { data, isPending, error } = useFetch(url);

  const { mode } = useTheme();

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="pending">Loading...</p>}
      {data && (
        <>
          <h2 className={`page-title ${mode}`}>{data.title}</h2>
          <p>Waktu Memask : {data.cookingTime}</p>
          <p className="method">Bahan :</p>
          <ul>
            {data.ingredients &&
              data.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
}
