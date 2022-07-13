import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, response } = useFirestore("transaction");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, amount);
    addDocument({ uid, name, amount });
  };

  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount (Rp)</span>
          <input
            required
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        {response.isPending && <button disabled>Loading...</button>}

        {!response.isPending && (
          <button className="btn">Add Transaction</button>
        )}

        {response.error && <p className="error">{response.error}</p>}
      </form>
    </>
  );
}
