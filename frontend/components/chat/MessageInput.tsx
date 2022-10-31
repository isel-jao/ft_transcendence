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
    console.log("pressed send message");
    socket.emit("newMessage", message);
    socket.once("onMessage", (data) => {
      handelChangeData(data);
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
        onKeyDown={(e) => handelPressEnter(e)}
        fullWidth
        placeholder="new message..."
        // TODO  need implementation
        value={message}
        onChange={handelChangeMessage}
      />
      <Divider orientation="vertical" />
      <IconButton size="small" onClick={handelSendMessage} sx={{ p: "4px" }}>
        <SendIcon htmlColor="#7F56DA" />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
