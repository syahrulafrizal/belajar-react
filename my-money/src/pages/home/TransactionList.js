import Styles from "./Home.module.css";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionList({ transactions }) {
  const formatNumber = (num, separator) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
  };
  const { deleteDocument } = useFirestore("transaction");
  return (
    <div>
      <ul className={Styles.transactions}>
        {transactions.map((trans) => (
          <li key={trans.id}>
            <p className={Styles.name}>{trans.name}</p>
            <p className={Styles.amount}>
              Rp {formatNumber(trans.amount, ".")}
            </p>
            <button
              onClick={() => {
                deleteDocument(trans.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
