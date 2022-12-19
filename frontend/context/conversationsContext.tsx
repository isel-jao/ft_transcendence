import { createContext, ReactNode, useMemo, useState } from "react";
import useConversationMessages from "../hooks/useConversationMessages";
import { useConversations } from "../hooks/useConversations";
import { IConversation, IFMessage } from "../types";

//create context with default value null
const ConversationsContext = createContext({
  conversations: [],
  messages: [],
  selectedChannel: {},
  setConversations: () => {},
  setMessages: () => {},
  setSelectedChannel: () => {},
});

//TODO add types
export const ConversationsProvider = ({ children }: any) => {
  // const ConversationsContext = createContext({
  //   conversations: [],
  //   messages: [],
  //   selectedChannel: {},
  //   setConversations: () => {},
  //   setMessages: () => {},
  //   setSelectedChannel: () => {},
  // });
  // const [selectedChannel, setSelectedChannel] = useState<IConversation>();
  // //Apis calls here and handling data
  // const {
  //   loading: loadingMessages,
  //   data: messages,
  //   error: errorMessages,
  //   refetch: refetchMessages,
  //   setData: setMessages,
  // } = useConversationMessages({ id_conversation: selectedChannel?.id });
  // const {
  //   loading: loadingConversations,
  //   data: conversations,
  //   error: errorConversations,
  //   refetch: refetchConversations,
  //   setData: setConversations,
  // } = useConversations();
  // const value = useMemo(
  //   () => ({
  //     conversations,
  //     setConversations,
  //     messages,
  //     setMessages,
  //     selectedChannel,
  //     setSelectedChannel,
  //   }),
  //   [] //TODO add dependencies
  // );
  // console.log({ conversations });
  // console.log({ messages });
  // return (
  //   <ConversationsContext.Provider value={value}>
  //     {children}
  //   </ConversationsContext.Provider>
  // );
};

export default ConversationsContext;
