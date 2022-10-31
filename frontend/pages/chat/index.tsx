import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import io from "socket.io-client";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useStepContext,
} from "@mui/material";

import Message from "../../components/chat/messageBox";
import Usercard from "../../components/chat/usercard";
import { IFuser, IFMessage, IFConversation } from "../../types";
import MessageBorder from "../../components/chat/MessageBorder";
import MessageInput from "../../components/chat/MessageInput";
import AddMessage from "../../components/chat/addMessage";

const SERVERURL = "http://localhost:5000/";

const friends: IFuser[] = [
  {
    id: 1,
    id_conversation: 13,
    name: "lily",
    status: "online",
  },
  {
    id: 2,
    id_conversation: 3,
    name: "yemma",
    status: "online",
  },
  {
    id: 4,
    id_conversation: 1,
    name: "yeen Kath",
    status: "offline",
  },
];

//TODO change data type, data: type of message
//TODO grap it fron the global context

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<any>([]);
  const [user, setUser] = useState(friends[0]);

  const socket = io(SERVERURL);
  socket.on("connect", () => {
    console.log("socket connected");
  });

  //TODO change any
  const handelChangeData = (newmessage: any) => {
    setMessages([...messages, newmessage]);
  };

  const handelUserChange = (selectedUser: IFuser) => {
    setUser(selectedUser);
  };

  useEffect(() => {
    console.log("rerender");
  }, [messages, user]);

  return (
    <Box
      sx={{
        padding: "10px 10px",
      }}
    >
      <Head>
        <title>Direct Messages</title>
      </Head>

      <Box
        //TODO calculate navBar height
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gridTemplateRows: "calc(100vh - 200px)",
          // padding: "10px 10px",
        }}
      >
        {/* first part */}
        <Box
          sx={{
            border: "1px solid #ddd",
          }}
        >
          <AddMessage />
          {friends.map((user, index) => (
            <Usercard
              key={index}
              user={user}
              handelUserChange={handelUserChange}
            />
          ))}
        </Box>

        {/* second part */}
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "0.1fr 3fr 0.1fr ",
            alignContent: "start",
            border: "1px solid #ddd",
          }}
        >
          <MessageBorder user={user} />
          <Box
            sx={{
              overflowY: "auto",
              // display: "flex",
              // flexDirection: "column-reverse",
            }}
          >
            {/* TODO change id add typees*/}
            {messages.map((item, index) => {
              console.log({ item });
              return (
                <Message key={index} message={item} sent_by={user.sent_by} />
              );
            })}
          </Box>
          <MessageInput socket={socket} handelChangeData={handelChangeData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
