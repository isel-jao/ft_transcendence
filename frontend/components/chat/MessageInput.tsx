import React, { useState, useEffect, useContext } from "react";
import { Box, Divider, IconButton, InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { SetMealSharp } from "@mui/icons-material";
import useConversationMessages from "../../hooks/useConversationMessages";
import { IFMessage } from "../../types";
import { isEmptyArray } from "formik";
import { convContext } from "../../context/selectedConversationContext";
import { webSocketContext } from "../../context/socketChatContext";

//TODO change type
const MessageInput = (props: {
  messages: IFMessage[];
  setMessages: Function;
}) => {
  const { selected, setSelected } = useContext(convContext);
  const socket = useContext(webSocketContext);
  const [message, setMessage] = useState<string>("");
  const { setMessages, messages } = props;
  const handelChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //TODO using id=1 as user_id, to be changed
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    //TODO add type
    socket.on("onMessage", (newMessage: any) => {
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    });

    //unregisted events when comp didunmount
    return () => {
      console.log("unregistring events");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const handelSendMessage = () => {
    if (message != "") {
      socket.emit("newMessage", {
        senderId: 1,
        conversationId: selected?.id,
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
        border: "1px solid #2c2039",
        borderRadius: "6px",
        margin: "10px 6px",
        // position: "fixed",
        // bottom: "0px",
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
