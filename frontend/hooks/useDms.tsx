import React, { useEffect, useState } from "react";
import { getAllDmsOfuser } from "../services/conversations";

const useDms = (props: { user_id: number }) => {
  const { user_id } = props;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);
  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getAllDmsOfuser(user_id)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
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

export { useDms };
