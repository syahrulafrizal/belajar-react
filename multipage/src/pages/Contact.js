import { useLocation } from "react-router-dom";

export default function Contact() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const name = queryParams.get("name");
  console.log(name);
  return <div>Hey!, {name}</div>;
}
