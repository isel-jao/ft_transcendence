import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import Usercard from "../../components/chat/userCard";
import MessageInput from "../../components/chat/MessageInput";
import Message from "../../components/chat/messageBox";
import { useDialog } from "../../hooks/useDialogue";
import io from "socket.io-client";
import AddIcon from "@mui/icons-material/LibraryAdd";
import Head from "next/head";

import { IFchannel, IFMessage } from "../../types";
import CreateChannelForm from "../../components/chat/createChannelForm";

const Mocked_data_channels: IFchannel[] = [
  { channel_name: "channel 1", type: "public" },
  { channel_name: "channel 2", type: "public" },
  { channel_name: "channel 3", type: "protected" },
  { channel_name: "channel 4", type: "private" },
  { channel_name: "channel 5", type: "private" },
];

const Mocked_data_members = [
  { user_name: "fmehdaou", status_user: "online", role: "owner" },
  { user_name: "isel-user", status_user: "offline", role: "admin" },
  { user_name: "yarji", status_user: "offline", role: "member" },
];

const Channels = () => {
  const { on, hide, show } = useDialog();

  const [selectChannel, setSelectChannel] = useState(
    Mocked_data_channels[0].channel_name
  );

  const handelSelectChannel = (channel: IFchannel) => {
    setSelectChannel(channel.channel_name);
  };

  const SERVERURL = "http://localhost:5000/";
  const socket = io(SERVERURL);
  socket.on("connect", () => {
    console.log("socket connected");
  });

  const [messages, setMessages] = useState<IFMessage[]>([
    {
      message_id: 1,
      message_body: "hello this is a message",
      date: "11/12/2022 6:00pm",
      send_by: "fmehdaou",
    },
  ]);

  const handelChangeMessages = (newmessage: any) => {
    setMessages([...messages, newmessage]);
  };

  useEffect(() => {}, [messages]);

  return (
    <Box
      sx={{
        backgroundColor: "#20172B",
        height: "89vh",
      }}
      // sx={{ backgroundColor: "#250020" }}
    >
      <Head>
        <title>channels</title>
      </Head>

      <CreateChannelForm on={on} hide={hide} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "10px",
          border: "2px solid #2C2039",
        }}
      >
        <Typography variant="h1">{selectChannel}</Typography>
        <Box>
          <IconButton onClick={() => show()}>
            <Tooltip title="create new channel">
              <AddIcon htmlColor="#7A4BD8" />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              console.log("channel settings to be implemented!");
            }}
          >
            <Tooltip title="channel settings">
              <SettingIcon htmlColor="#7A4BD8" />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 5fr 2fr",
          border: "1px solid #2C2039",
          // gap: "6px",
          backgroundColor: "#fff",
          height: "100%", //100% of 90vh in parent box
        }}
      >
        {/* cahnnels name */}
        <Box
          sx={{
            borderRight: "2px solid #2C2039",
            backgroundColor: "#231834",
          }}
        >
          {Mocked_data_channels.map((channel) => (
            <Box
              sx={{ p: "5px 6px", cursor: "pointer" }}
              onClick={() => {
                handelSelectChannel(channel);
              }}
            >
              <Typography variant="body1">{channel.channel_name}</Typography>
            </Box>
          ))}
        </Box>

        {/* channel- messages  */}
        <Box
          sx={{
            borderRight: "2px solid #2C2039",
            display: "grid",
            backgroundColor: "#231834",
          }}
        >
          <Box>
            {messages.map((item, index) => {
              console.log({ item });
              return (
                <Message key={index} message={item} send_by={item.send_by} />
              );
            })}
          </Box>
          <Box sx={{ alignSelf: "end" }}>
            <MessageInput
              socket={socket}
              handelChangeData={handelChangeMessages}
            />
          </Box>
        </Box>

        {/* channel memebers */}
        <Box
          sx={{
            backgroundColor: "#231834",
            p: "4px 10px 4px",
          }}
        >
          <Box>
            <Typography variant="h2">Owners</Typography>
            {Mocked_data_members.filter((member) => member.role == "owner").map(
              (item) => (
                <Usercard
                  user={{ name: item.user_name, status: item.status_user }}
                  type="room"
                />
              )
            )}
          </Box>
          <Box>
            <Typography variant="h2">Admins</Typography>
            {Mocked_data_members.filter((member) => member.role == "admin").map(
              (item) => (
                <Usercard
                  user={{ name: item.user_name, status: item.status_user }}
                  type="room"
                />
              )
            )}
          </Box>
          <Box>
            <Box>
              <Typography variant="h2">Members</Typography>
              {Mocked_data_members.filter(
                (member) => member.role == "member"
              ).map((item) => (
                <Usercard
                  user={{ name: item.user_name, status: item.status_user }}
                  type="room"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Channels;
