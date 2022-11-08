import React, { useEffect, useState } from "react";
import { getConversations } from "../services/conversations";

const conversations = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(); //add type
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);

  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then((conversations) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    data,
    error,
    refetch,
  };
};

export { conversations };
