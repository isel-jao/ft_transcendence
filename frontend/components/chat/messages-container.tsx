import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MessageInput from "./MessageInput";
import Message from "./messageBox";
import { IFMessage } from "../../types";
import { io } from "socket.io-client";
import useConversationMessages from "../../hooks/useConversationMessages";

const MessagesContainer = (props: { selectedChannel: number }) => {
  const { selectedChannel } = props;
  // const [messages, setMessages] = useState<IFMessage[]>([
  //   {
  //     body: "hello this is a message",
  //     createdAt: "11/12/2022 6:00pm",
  //     sentBy: {
  //       firstName: "fmehdaou",
  //       lastName: "test",
  //     },
  //   },
  // ]);

  const {
    data: messages,
    loading,
    error,
    refetch,
    setData: setMessages,
  } = useConversationMessages({
    id_conversation: selectedChannel,
  });

  const SERVERURL = "http://localhost:5000/";
  const socket = io(SERVERURL);
  // SocketAddress.emit("joinChannel", { userId: 1 })
  socket.on("connect", () => {
    // console.log("socket connected");
  });

  const handelChangeMessages = (newmessage: any) => {
    // setMessages([...messages, newmessage]);
  };

  // messages.map((item) => console.log(item));

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        display: "grid",
        backgroundColor: "#231834",
      }}
    >
      <Box>
        {messages &&
          messages.map((item, index) => {
            return <Message key={index} message={item} />;
          })}
      </Box>
      <Box sx={{ alignSelf: "end" }}>
        <MessageInput
          socket={socket}
          handelChangeData={handelChangeMessages}
          selectedChannel={selectedChannel}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </Box>
  );
};

export default MessagesContainer;
