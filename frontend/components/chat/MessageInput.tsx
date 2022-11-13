import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { SetMealSharp } from "@mui/icons-material";

//TODO change type
const MessageInput = (props: {
  socket: Socket;
  handelChangeData: Function;
}) => {
  const [message, setMessage] = useState<string>("");
  const { socket, handelChangeData } = props;

  const handelChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handelSendMessage = () => {
    socket.emit("newMessage", message);
    socket.once("onMessage", (newMessage) => {
      console.log("newMessage");
      handelChangeData(newMessage);
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
        sx={{ p: "0px 6px" }}
        onKeyDown={(e) => handelPressEnter(e)}
        fullWidth
        placeholder="new message..."
        // TODO  need implementation
        value={message}
        onChange={handelChangeMessage}
      />
      <Divider orientation="vertical" />
      <IconButton size="small" onClick={handelSendMessage} sx={{ p: "4px" }}>
        <SendIcon htmlColor="#00B0B6" />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
