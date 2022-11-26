import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import Usercard from "../../components/chat/userCard";
import { useDialog } from "../../hooks/useDialogue";
import AddIcon from "@mui/icons-material/LibraryAdd";
import Head from "next/head";
import { useConversations } from "../../hooks/useConversations";
import LinearProgress from "@mui/material/LinearProgress";
import MsgIcon from "@mui/icons-material/Sms";
import { IFchannel } from "../../types";
import CreateChannelForm from "../../components/chat/createChannelForm";
import MessagesContainer from "../../components/chat/messages-container";
import useConversationMessages from "../../hooks/useConversationMessages";

const Mocked_data_members = [
  { user_name: "fmehdaou", status_user: "online", role: "owner" },
  { user_name: "isel-user", status_user: "offline", role: "admin" },
  { user_name: "yarji", status_user: "offline", role: "member" },
];

const Channels = () => {
  const { on, hide, show } = useDialog();
  const { loading, data: channels, error, refetch } = useConversations();
  const [selectChannel, setSelectChannel] = useState(channels[0]);

  // console.log({ channels });
  const handelSelectChannel = (channel: IFchannel) => {
    setSelectChannel(channel);
  };

  useEffect(() => {}, [channels]);

  if (!channels) return <LinearProgress />;
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

      <CreateChannelForm on={on} hide={hide} refetch={refetch} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "10px",
          border: "2px solid #2C2039",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <MsgIcon htmlColor="#941484" />
          <Typography variant="h1">Messaging</Typography>
        </Box>
        <Box>
          <IconButton onClick={() => show()}>
            <Tooltip title="create new channel">
              <AddIcon htmlColor="#941484" />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              console.log("channel settings to be implemented!");
            }}
          >
            <Tooltip title="channel settings">
              <SettingIcon htmlColor="#941484" />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 5fr 2fr",
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
            p: "10p 4pxx",
          }}
        >
          {channels.map((channel, index) => (
            <Box
              key={index}
              sx={{ p: "5px 6px", cursor: "pointer" }}
              onClick={() => {
                handelSelectChannel(channel);
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "14px",
                  backgroundColor: `${
                    channel.id == selectChannel?.id ? "#1B182C" : "transparent"
                  }`,
                  p: "14px",
                  borderRadius: "12px",
                }}
              >
                <Avatar
                  sx={{ backgroundColor: "#413A4E" }}
                  variant="square"
                  children={`${channel.name.split(" ")[0][0].toUpperCase()}${
                    channel.name.split(" ")[1]
                      ? channel.name.split(" ")[1][0].toUpperCase()
                      : ""
                  }`}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "14px",
                    color: "#9C9A8C",
                    textTransform: "capitalize",
                  }}
                >
                  {channel.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/* channel- messages  */}
        <MessagesContainer selectedChannel={selectChannel?.id} />
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
              ).map((item, index) => (
                <Usercard
                  key={index}
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
