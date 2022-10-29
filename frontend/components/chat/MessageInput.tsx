import React, { useState, useEffect } from "react";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";

//TODO change type
const MessageInput = (props: { socket: Socket }) => {
  const [message, setMessage] = useState<string>();
  const { socket } = props;

  useEffect(() => {}, []);

  const handelChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handelSendMessage = () => {
    socket.emit("newMessage", message);
    socket.on("onMessage", (data) => {
      console.log({ data });
    });
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
        fullWidth
        placeholder="new message..."
        // TODO  need implementation
        onChange={(e) => handelChangeMessage(e.target.value)}
      />
      <Divider orientation="vertical" />
      <IconButton
        size="small"
        onClick={() => handelSendMessage()}
        sx={{ p: "4px" }}
      >
        <SendIcon htmlColor="#7F56DA" />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
