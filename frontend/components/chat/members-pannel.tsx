import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { IConversation } from "../../context/types";
import { convContext } from "../../context/selectedConversationContext";
import FriendsList from "./friends-list";

import MemberList from "./member-list";

//TODO Add type to the componenet

const MembersPannel = (props: {
  setChannels: () => void;
  channels: IConversation[];
}) => {
  const { channels, setChannels } = props;
  const { activeTab } = useContext(convContext);

  return (
    <Box
      sx={{
        background: "#000",
        display: "grid",
        alignContent: "space-between",
        gridTemplateRows: " auto min-content",
      }}
    >
      {activeTab > 0 ? (
        <FriendsList />
      ) : (
        <MemberList setChannels={setChannels} channels={channels} />
      )}
    </Box>
  );
};

export default MembersPannel;
