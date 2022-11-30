import { createContext, useState } from "react";

//create context with default value null
export const ConversationsContext = createContext({});

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  //Apis calls here and handling data

  const value = {
    conversations,
    setConversations,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsContext;
