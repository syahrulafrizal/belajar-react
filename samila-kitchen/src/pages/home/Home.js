// import { useFetch } from "../../hooks/useFetch";
import { firestore } from "../../firebase/config";
import { useState, useEffect } from "react";

//styless
import "./Home.css";

//component
import RecipeList from "../../components/RecipeList";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:2599/recipes");

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsPending(true);
    // get firestore data
    firestore
      .collection("recipes")
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        if (snapshot.empty) {
          setError("No Receipes to Load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            console.log(doc);
            results.push({ ...doc.data(), id: doc.id });
          });
          setData(results);
          setIsPending(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="pending">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
