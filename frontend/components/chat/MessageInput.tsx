import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { SetMealSharp } from "@mui/icons-material";
import useConversationMessages from "../../hooks/useConversationMessages";
import { IFMessage } from "../../types";

//TODO change type
const MessageInput = (props: {
  socket: Socket;
  handelChangeData: Function;
  selectedChannel: number;
  setMessages: Function;
  messages: IFMessage[];
}) => {
  const [message, setMessage] = useState<string>("");
  const { socket, handelChangeData, selectedChannel, messages, setMessages } =
    props;

  const handelChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //TODO using id=1 as user_id, to be changed
  const handelSendMessage = () => {
    socket.emit("newMessage", {
      senderId: 1,
      conversationId: selectedChannel,
      body: message,
    });
    socket.once("onMessage", (newMessage) => {
      console.log("newMessage", newMessage);
      handelChangeData(newMessage);
      // setMessages(() => {});
    });
    setMessage("");
  };

  //TODO change any
  const handelPressEnter = (event: any) => {
    if (event.key === "Enter") {
      setMessage(event.target.value);
      handelSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "space-between",
        justifyContent: "center",
        border: "1px solid #ddd",
        borderRadius: "6px",
        margin: "10px 6px",
      }}
    >
      <InputBase
        sx={{ p: "0px 6px", color: "#fff" }}
        onKeyDown={(e) => handelPressEnter(e)}
        fullWidth
        placeholder="write a message..."
        // TODO  need implementation
        value={message}
        onChange={handelChangeMessage}
      />
      <Divider orientation="vertical" />
      <IconButton size="small" onClick={handelSendMessage} sx={{ p: "4px" }}>
        <SendIcon htmlColor="#469DED" />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
