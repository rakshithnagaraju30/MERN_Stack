import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const abortController = new AbortController();

    // Define the async function inside the effect
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });

        // Check if HTTP status is OK (200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        
        setData(json);
        setLoading(false);
      } catch (err) {
        // Only update state if it wasn't a deliberate abort cancellation
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: cancels the request if the component unmounts
    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
