import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDialog } from "../../hooks/useDialogue";
import Head from "next/head";
import { useConversations } from "../../hooks/useConversations";
import CreateChannelForm from "../../components/chat/createChannelForm";
import MessagesContainer from "../../components/chat/messages-container";
import SidePannel from "../../components/chat/side-pannel";
import { SelectedConversationProvider } from "../../context/selectedConversationContext";
import { WebSocketProvider } from "../../context/socketChatContext";
import MembersContainer from "../../components/chat/channelMembersContainer";

// background: "linear-gradient( #171221 10%, #171328 80.61%)",

const Chat = () => {
  const { on, hide, show } = useDialog();
  const { data: channels, setData: setChannels, refetch } = useConversations();

  return (
    <WebSocketProvider>
      <SelectedConversationProvider>
        <Box
          sx={{
            height: "100%",
            background: "linear-gradient( #171221 10%, #171328 80.61%)",
          }}
        >
          <Head>
            <title>Chat</title>
          </Head>
          <CreateChannelForm
            on={on}
            hide={hide}
            setChannels={setChannels}
            channels={channels}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 5fr 2fr",
              border: "1px solid #2C2039",
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <SidePannel channels={channels} show={show} refetch={refetch} />
            <MessagesContainer />
            <MembersContainer refetch={refetch} channels={channels} />
          </Box>
        </Box>
      </SelectedConversationProvider>
    </WebSocketProvider>
  );
};

export default Chat;
