import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import Usercard from "../../components/chat/userCard";
import { useDialog } from "../../hooks/useDialogue";
import Head from "next/head";
import { useConversations } from "../../hooks/useConversations";
import LinearProgress from "@mui/material/LinearProgress";
import MsgIcon from "@mui/icons-material/Sms";
import { IFchannel } from "../../types";
import CreateChannelForm from "../../components/chat/createChannelForm";
import MessagesContainer from "../../components/chat/messages-container";
import ChannelMembersContainer from "../../components/chat/channelMembersContainer";
import useConversationMessages from "../../hooks/useConversationMessages";
import ChannelsNamesContainer from "../../components/chat/channelsNamesContainer";

const Channels = () => {
  const { on, hide, show } = useDialog();
  const { data: channels, refetch } = useConversations();
  const [selectChannel, setSelectChannel] = useState<any>();
  const { data: messages, setData: setMessages } = useConversationMessages({
    id_conversation: selectChannel?.id,
  });

  useEffect(() => {}, [channels, messages, selectChannel]);

  if (!channels) return <LinearProgress />;
  return (
    <Box
      sx={{
        backgroundColor: "#20172B",
        height: "88vh",
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
          borderBottom: "1px solid #33334D",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            p: "20px",
          }}
        >
          <MsgIcon htmlColor="#6445DF" />
          <Typography variant="h1">Messaging</Typography>
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              console.log("channel settings to be implemented!");
            }}
          >
            <Tooltip title="channel settings">
              <SettingIcon htmlColor="#6445DF" />
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
        <ChannelsNamesContainer
          channels={channels}
          setSelectChannel={setSelectChannel}
          selectChannel={selectChannel}
          show={show}
        />
        {/* channel- messages  */}
        <MessagesContainer
          selectedChannel={selectChannel}
          messages={messages}
          setMessages={setMessages}
        />
        {/* channel memebers */}
        <ChannelMembersContainer
          selectedChannel={selectChannel}
          refetch={refetch}
          setSelectChannel={setSelectChannel}
          setMessages={setMessages}
          channels={channels}
        />
      </Box>
    </Box>
  );
};

export default Channels;
