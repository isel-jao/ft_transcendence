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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

interface IFuser {
  name: string;
  status: string;
}

interface IFMessage {
  message_id: number;
  message_body: string;
  date: string;
}

interface IFConversations {
  id_conversation: number;
  messages: IFMessage[];
}

const users = [
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

const conversations = [
  {
    id: "1",
    messages: [
      {
        message: "hello, friend how are you ?",
        date: "10/19/2022 6:33 PM",
      },
      {
        message: "hello, friend how are you ?",
        date: "10/19/2022 6:33 PM",
      },
    ],
  },
  {
    id: "2",
    messages: [
      {
        message: "hello, friend how are you ?",
        date: "10/19/2022 6:33 PM",
      },
      {
        message: "hello, friend how are you ?",
        date: "10/19/2022 6:33 PM",
      },
    ],
  },
];

const Chat: NextPage = () => {
  const username = "@fmehdaou";
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
          {users.map((user) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    // alignItems: "center",
                    gap: "10px",
                    padding: "4px 0px",
                  }}
                >
                  <Avatar sx={{ width: 24, height: 24 }} />
                  <Typography>{user.name}</Typography>
                </Box>
              </>
            );
          })}
        </Box>

        {/* second part */}
        <Box
          sx={{
            display: "grid",
            alignContent: "space-between",
            border: "1px solid #000",
          }}
        >
          <Box sx={{ borderBottom: "1px solid #000" }}>
            <Typography>{username}</Typography>
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
