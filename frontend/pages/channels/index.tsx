import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import { useDialog } from "../../hooks/useDialogue";
import Head from "next/head";
import { useConversations } from "../../hooks/useConversations";
import LinearProgress from "@mui/material/LinearProgress";
import MsgIcon from "@mui/icons-material/Sms";
import CreateChannelForm from "../../components/chat/createChannelForm";
import MessagesContainer from "../../components/chat/messages-container";
import ChannelMembersContainer from "../../components/chat/channelMembersContainer";
import useConversationMessages from "../../hooks/useConversationMessages";
import ChannelsNamesContainer from "../../components/chat/side-pannel";
import { WebSocketProvider } from "../../context/SocketContext";
import SidePannel from "../../components/chat/side-pannel";
import {
  SelectedConversationProvider,
  convContext,
} from "../../context/selectedConversationContext";

// background: "linear-gradient( #171221 10%, #171328 80.61%)",

const Channels = () => {
  const { selected } = useContext(convContext);
  const { on, hide, show } = useDialog();
  const { data: channels, refetch, loading } = useConversations();

  // useEffect(() => {}, [channels, messages, selected]);

  // if (loading) return <LinearProgress />;
  return (
    <WebSocketProvider>
      <SelectedConversationProvider>
        <Box
          sx={{
            // backgroundColor: "#20172B",
            height: "100%",
            background: "linear-gradient( #171221 10%, #171328 80.61%)",
          }}
          // sx={{ backgroundColor: "#250020" }}
        >
          <Head>
            <title>channels</title>
          </Head>

          <CreateChannelForm on={on} hide={hide} refetch={refetch} />

          {/* <ChannelTopBar selectedChannel={selectChannel} /> */}

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
            <SidePannel channels={channels} show={show} refetch={refetch} />
            <MessagesContainer />
            <ChannelMembersContainer refetch={refetch} channels={channels} />
          </Box>
        </Box>
      </SelectedConversationProvider>
    </WebSocketProvider>
  );
};

export default Channels;
