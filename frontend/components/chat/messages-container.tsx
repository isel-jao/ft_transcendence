import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import MessageInput from "./MessageInput";
import Message from "./messageBox";
import { IFMessage } from "../../types";
import { io, Socket } from "socket.io-client";
import useConversationMessages from "../../hooks/useConversationMessages";

const MessagesContainer = (props: { selectedChannel: number }) => {
  const { selectedChannel } = props;
  const socket = io("http://localhost:5000/", {
    autoConnect: false,
    query: {
      id: 1,
    },
  });
  socket.connect();

  const {
    data: messages,
    loading,
    error,
    refetch,
    setData: setMessages,
  } = useConversationMessages({
    id_conversation: selectedChannel,
  });

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        display: "grid",
        backgroundColor: "#231834",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
          // width: "3px",
          // height: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ddd",
        },
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
          selectedChannel={selectedChannel}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </Box>
  );
};

export default MessagesContainer;
