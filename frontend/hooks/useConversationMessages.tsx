import React, { useContext, useEffect, useState } from "react";
import { getConversationMessages } from "../services/conversations";
import { IFMessage } from "../types";
import { convContext } from "../context/selectedConversationContext";

/* 
    get messages for a giving id of conversation,
    it gets invoked when referch or id_conv changed  */

interface Props {
  id_conversation?: number;
}

const useConversationMessages = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFMessage[]>([]);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);
  const refetch = () => setRetry(retry + 1);

  const { selected, setSelected } = useContext(convContext);

  useEffect(() => {
    if (selected) {
      setLoading(true);
      getConversationMessages(selected?.id)
        .then((res) => {
          setData(res);
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
    loading,
    data,
    error,
    refetch,
    setData,
  };
};

export default useConversationMessages;
