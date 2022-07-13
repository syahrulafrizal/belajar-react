import { useEffect, useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// style
import Styles from "./Signup.module.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name);
    signup(email, password, name);
  };

  // useEffect(() => {
  // }, [])

  return (
    <form className={Styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <label>
        <span>Nama</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}

      {!isPending && <button className="btn">Signup</button>}

      {error && <p className="error">{error}</p>}
    </form>
  );
}
