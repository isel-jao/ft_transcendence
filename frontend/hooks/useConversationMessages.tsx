import React, { useEffect, useState } from "react";
import { getConversationMessages } from "../services/conversations";
import { IFMessage } from "../types";

/* 
    get messages for a giving id of conversation,
    it gets invoked when referch or id_conv changed  */

interface Props {
  id_conversation?: number;
}

const useConversationMessages = (props: Props) => {
  const { id_conversation } = props;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IFMessage[]>([]);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);
  const refetch = () => setRetry(retry + 1);

  useEffect(() => {
    setLoading(true);
    getConversationMessages(id_conversation ?? -1)
      .then((res) => {
        console.log("useConvmessage =>>", res);

        setData(res);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [retry, id_conversation]);

  return {
    loading,
    data,
    error,
    refetch,
    setData,
  };
};

export default useConversationMessages;
