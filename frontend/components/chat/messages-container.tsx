import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import MessageInput from "./MessageInput";
import Message from "./messageBox";
import { IFchannel, IFMessage } from "../../types";
import { io, Socket } from "socket.io-client";
import useConversationMessages from "../../hooks/useConversationMessages";
import ConversationsContext from "../../context/conversationsContext";

// props: {
//   selectedChannel: IFchannel;
//   messages: IFMessage[];
//   setMessages: Function;
// }
// const { selectedChannel, messages, setMessages } = props;

const MessagesContainer = (props: {
  selectedChannel: IFchannel;
  messages: IFMessage[];
  setMessages: Function;
}) => {
  const socket = io("http://localhost:5000/", {
    autoConnect: false,
    query: {
      id: 1,
    },
  });
  socket.connect();
  const { selectedChannel, messages, setMessages } = props;

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        display: "grid",
        gridTemplateRows: "min-content auto min-content",
        backgroundColor: "#231834",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ddd",
        },
      }}
    >
      <Box
        sx={{
          p: "25px 15px",
          borderBottom: "1px solid #33334D",
          position: "fixed",
          backgroundColor: "#231834",
          width: "100%",
        }}
      >
        <Typography variant="h1">{selectedChannel?.name}</Typography>
      </Box>
      <Box>
        {messages &&
          messages.map((item, index) => {
            return <Message key={index} message={item} />;
          })}
      </Box>
      <Box sx={{ alignSelf: "end" }}>
        <MessageInput
          socket={socket}
          selectedChannel={selectedChannel?.id}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </Box>
  );
};

export default MessagesContainer;
