import React, { useState, useEffect } from "react";
import { getAllFriends } from "../services/dms";

//TODO add types here
const useFriends = (user_id: number) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [retry, setRetry] = useState(0);
  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getAllFriends(user_id)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user_id]);

  return { data, setData, error, setError, refetch };
};

export { useFriends };
