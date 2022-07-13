import Styles from "./Home.module.css";
import TransactionHome from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestoreSnapshot } from "../../hooks/useFirestoreSnapshot";

export default function Home() {
  const { user } = useAuthContext();
  const { document, error } = useFirestoreSnapshot(
    "transaction",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  console.log(document);
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        {error && <p className="error">{error}</p>}
        {document && <TransactionList transactions={document} />}
      </div>
      <div className={Styles.sidebar}>
        <TransactionHome uid={user.uid} />
      </div>
    </div>
  );
}
