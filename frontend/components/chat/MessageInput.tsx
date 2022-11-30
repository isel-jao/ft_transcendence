import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { SetMealSharp } from "@mui/icons-material";
import useConversationMessages from "../../hooks/useConversationMessages";
import { IFMessage } from "../../types";
import { isEmptyArray } from "formik";

//TODO change type
const MessageInput = (props: {
  socket: Socket;
  selectedChannel: number;
  messages: IFMessage[];
  setMessages: Function;
}) => {
  const [message, setMessage] = useState<string>("");
  const { socket, selectedChannel, setMessages, messages } = props;

  const handelChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //TODO using id=1 as user_id, to be changed
  useEffect(() => {
    socket.off("onMessage").on("onMessage", (newMessage) => {
      console.log("newMessage", newMessage);
      console.log({ messages });
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
      console.log({ messages });
    });
  }, []);

  const handelSendMessage = () => {
    if (message != "") {
      socket.emit("newMessage", {
        senderId: 1,
        conversationId: selectedChannel,
        body: message,
      });
      setMessage("");
    }
  };

  useEffect(() => {}, [messages]);

  //TODO change any
  const handelPressEnter = (event: any) => {
    if (event.key === "Enter") {
      if (message != "") {
        setMessage(event.target.value);
        handelSendMessage();
      }
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
