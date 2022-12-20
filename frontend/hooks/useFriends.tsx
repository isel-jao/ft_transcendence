import React, { useEffect, useState } from "react";
import { getAllFriends } from "../services/dms";

//TODO add types here
const useFriends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [retry, setRetry] = useState(0);
  const refetch = () => setRetry(retry);

  useEffect(() => {
    setLoading(true);
    getAllFriends()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retry]);

  return { data, setData, error, setError, refetch };
};

export { useFriends };
