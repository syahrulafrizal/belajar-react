// react component
import { Routes, Route, Link, NavLink } from "react-router-dom";

// styless
import "./App.css";

// pages
import About from "./pages/About";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";

function App() {
  return (
    <div className="App">
      <h1>My Article</h1>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
