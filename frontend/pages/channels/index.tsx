import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import Usercard from "../../components/chat/userCard";
import MessageInput from "../../components/chat/MessageInput";
import Message from "../../components/chat/messageBox";
import io from "socket.io-client";

import { IFchannel, IFMessage } from "../../types";

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
      sx={{}}
      // sx={{ backgroundColor: "#250020" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "10px",
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="h1">{selectChannel}</Typography>
        <SettingIcon />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 5fr 2fr",
          border: "1px solid #ddd",
          gap: "6px",
        }}
      >
        {/* cahnnels bname */}
        <Box
          sx={{
            borderRight: "1px solid #ddd",
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

        {/* channel messages  */}
        <Box
          sx={{
            borderRight: "1px solid #ddd",
            display: "grid",
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
        <Box>
          <Box>
            <Typography>Owners</Typography>
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
            <Typography>Admins</Typography>
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
              <Typography>Members</Typography>
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
