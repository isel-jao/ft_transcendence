import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Avatar,
  InputBase,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import Message from "../../components/chat/messageBox";
import Usercard from "../../components/chat/usercard";
import { IFuser, IFMessage, IFConversation } from "../../types";

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
    name: "yeen",
    status: "offline",
  },
];

const conversation: IFConversation = {
  id_conversation: 1,
  sent_by: {
    name: "yeen",
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
          gridTemplateRows: "calc(100vh - 500px)",
          // padding: "10px 10px",
        }}
      >
        {/* first part */}
        <Box
          sx={{
            border: "1px solid #000",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #000",
            }}
          >
            <Typography>Direct Messages</Typography>
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
            border: "1px solid #000",
          }}
        >
          <Box
            sx={{
              p: "10px 10px",
              backgroundColor: "#fff",
              display: "flex",
              gap: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography>{conversation.sent_by.name}</Typography>
            <Box
              sx={{
                borderRadius: "10px",
                padding: "1px 10px",
                backgroundColor: "#EBFDF4",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ddd",
                  width: "3px",
                  borderRadius: "50% 50%",
                }}
              />
              <Typography
                sx={{
                  color: "#16B66A",
                }}
              >
                {conversation.sent_by.status}
              </Typography>
            </Box>
          </Box>
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

          <Box
            sx={{
              display: "flex",
              alignItems: "space-between",
              justifyContent: "center",
              border: "1px solid #000",
              borderRadius: "6px",
              margin: "10px 6px",
            }}
          >
            <InputBase
              fullWidth
              placeholder="new message..."
              // TODO  need implementation
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <Divider orientation="vertical" />
            <IconButton
              onClick={() => {
                //TODO need implementation
                console.log("sent message!");
              }}
              sx={{ p: "4px" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
