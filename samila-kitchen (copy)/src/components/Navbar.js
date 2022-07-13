import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { color, changeColor } = useTheme();
  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      {/* <nav onClick={() => changeColor("pink")}> */}
      <nav onClick={() => changeColor("pink")}>
        <Link to={"/"} className="brand">
          <h1>Samila Resto</h1>
        </Link>
        <Searchbar />
        <Link to={"/create"}>Tambah Resep</Link>
      </nav>
    </div>
  );
}
