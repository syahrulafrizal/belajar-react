import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (dataBody) => {
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataBody),
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    setIsPending(true);
    const fetchData = async (fetchOption) => {
      console.log(fetchOption);
      try {
        const res = await fetch(url, {
          ...fetchOption,
          signal: controller.signal,
        });
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

    if (method === "GET") {
      fetchData();
    }

    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => controller.abort();
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
