import React, { useEffect, useState } from "react";
import { getConversations } from "../services/conversations";
import { IConversation } from "../context/types";

const useConversations = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IConversation[]>([]);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);

  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then((conversations) => {
        setData(conversations);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retry]);

  return {
    loading,
    data,
    error,
    setData,
    refetch,
  };
};

export { useConversations };
