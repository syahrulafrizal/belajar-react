import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// styless
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return (
      <div className="error">
        Pencarian resep tidak ditemukan, harap gunakan kata kunci lainnya
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}</div>
          <Link to={`/recipes/${recipe.id}`}>Detail Resep</Link>
        </div>
      ))}
    </div>
  );
}
