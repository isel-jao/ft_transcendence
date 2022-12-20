import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";
import SettingIcon from "@mui/icons-material/Tune";
import { useDialog } from "../../hooks/useDialogue";
import Head from "next/head";
import { useConversations } from "../../hooks/useConversations";
import CreateChannelForm from "../../components/chat/createChannelForm";
import MessagesContainer from "../../components/chat/messages-container";
import ChannelMembersContainer from "../../components/chat/channelMembersContainer";
import SidePannel from "../../components/chat/side-pannel";
import {
  SelectedConversationProvider,
  convContext,
} from "../../context/selectedConversationContext";
import { WebSocketProvider } from "../../context/socketChatContext";

// background: "linear-gradient( #171221 10%, #171328 80.61%)",

const Channels = () => {
  const { selected } = useContext(convContext);
  const { on, hide, show } = useDialog();
  const { data: channels, refetch, loading } = useConversations();
  const { activeTab } = useContext(convContext);

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
            {/* {activeTab > 0 && (
              )} */}
            <ChannelMembersContainer refetch={refetch} channels={channels} />
          </Box>
        </Box>
      </SelectedConversationProvider>
    </WebSocketProvider>
  );
};

export default Channels;
