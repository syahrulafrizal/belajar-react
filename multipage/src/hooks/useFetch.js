import { useState, useEffect, useRef } from "react";

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const options = useRef(_options).current;

  useEffect(() => {
    const controller = new AbortController();
    setIsPending(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        setData(json);
        setError(null);
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("fetch was abrted");
        } else {
          setIsPending(false);
          setError("Tidak Dapat Load Data");
          console.log(error.message);
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url, options]);

  return { data, isPending, error };
};
