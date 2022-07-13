import { useFetch } from "../../hooks/useFetch";

//styless
import "./Home.css";

//component
import RecipeList from "../../components/RecipeList";

export default function Home() {
  const { data, isPending, error } = useFetch("http://localhost:2599/recipes");
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="pending">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
