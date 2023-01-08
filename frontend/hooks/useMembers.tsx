import React, { useContext, useEffect, useState } from "react";
import { getChannelMembers } from "../services/conversations";
import { convContext } from "../context/selectedConversationContext";
import { IMember } from "../types";

const useMembers = () => {
  const [data, setData] = useState<IMember[]>([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [retry, setRetry] = useState(0);
  const { selected } = useContext(convContext);

  console.log({ selected });

  const refetch = () => setRetry(retry + 1);
  useEffect(() => {
    if (selected != null) {
      setLoading(true);
      getChannelMembers(selected?.id ?? -1)
        .then((memebers) => {
          console.log({ memebers });
          setData(memebers);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [retry, selected?.id]);

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    refetch,
  };
};

export default useMembers;
