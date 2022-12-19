import React, { useState, useEffect } from "react";
import { IConversation } from "../types";
import { getAllConvrsations } from "../services/conversations";

const UseAllConversations = () => {
  const [data, setData] = useState<IConversation[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(0);

  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getAllConvrsations()
      .then((res) => setData(res))
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retry]);

  return {
    data,
    setData,
    error,
    loading,
    refetch,
  };
};

export default UseAllConversations;
