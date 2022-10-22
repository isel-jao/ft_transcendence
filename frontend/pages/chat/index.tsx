import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Message from "../../components/chat/messageBox";
import Usercard from "../../components/chat/usercard";
import { IFuser, IFMessage, IFConversation } from "../../types";
import MessageBorder from "../../components/chat/MessageBorder";
import MessageInput from "../../components/chat/MessageInput";

const users: IFuser[] = [
  {
    name: "lily",
    status: "online",
  },
  {
    name: "yemma",
    status: "online",
  },
  {
    name: "yeen Kath",
    status: "offline",
  },
];

const conversation: IFConversation = {
  id_conversation: 1,
  sent_by: {
    name: "yeen Kath",
    status: "online",
  },
  messages: [
    {
      message_id: 1,
      message_body:
        "hello, friend how are you ?hello, friend how are you ? hello, friend how are you ? hello, friend how are you ?   ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "great!",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
    {
      message_id: 1,
      message_body: "hello, friend how are you ?  ",
      date: "10/19/2022 6:33 PM",
    },
  ],
};

const Chat: NextPage = () => {
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #ddd",
              p: "10px",
            }}
          >
            <Typography variant="h2">Messages</Typography>
            <IconButton
              sx={{
                "&.MuiButtonBase-root": {
                  padding: "0px",
                },
              }}
              //TODO need implementation
              onClick={() => {
                console.log("add in direct message  clicked");
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          {users.map((user) => (
            <Usercard user={user} />
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
          <MessageBorder conversation={conversation} />
          <Box
            sx={{
              overflowY: "auto",
            }}
          >
            {/* TODO change id */}
            {conversation.messages.map((item) => (
              <Message message={item} sent_by={conversation.sent_by} />
            ))}
          </Box>
          <MessageInput />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
