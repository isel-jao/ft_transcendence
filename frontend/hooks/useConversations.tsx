import React, { useEffect, useState } from "react";
import { getConversations } from "../services/conversations";
import { IFchannel } from "../types";

const useConversations = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFchannel[]>([]);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);

  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getConversations()
      .then((conversations) => {
        console.log({ conversations });
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
    refetch,
  };
};

export { useConversations };
