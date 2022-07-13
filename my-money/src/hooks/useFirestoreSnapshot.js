import { useState, useEffect, useRef } from "react";
import { firestore } from "../firebase/config";

export const useFirestoreSnapshot = (collectionName, _query, _orderBy) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestore.collection(collectionName);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        console.log(results);
        setDocument(results);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setError(error.message);
      }
    );

    return () => unsub();
  }, [collectionName, query, orderBy]);

  return { document, error };
};
