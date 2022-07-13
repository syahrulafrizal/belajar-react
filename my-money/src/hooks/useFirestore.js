import { useReducer, useEffect, useState } from "react";
import { firestore, timestamp } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...initialState, isPending: true };

    case "ADD_DOC":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };

    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };

    case "DELETE_DOC":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = firestore.collection(collectionName);

  const dispatchClean = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const added = await ref.add({ ...doc, createdAt });
      console.log("addDocument : ", added);
      dispatchClean({ type: "ADD_DOC", payload: added });
    } catch (error) {
      console.log(error.message);
      dispatchClean({ type: "ERROR", payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatchClean({ type: "IS_PENDING" });
    try {
      await ref.doc(id).delete();
      dispatchClean({ type: "DELETE_DOC" });
    } catch (error) {
      console.log(error.message);
      dispatchClean({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
