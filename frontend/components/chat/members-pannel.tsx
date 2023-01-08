import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { deleteConversationById } from "../../services/conversations";
import { IConversation } from "../../types";
import { convContext } from "../../context/selectedConversationContext";
import FriendsList from "./friends-list";

import MemberList from "./member-list";

//TODO Add type to the componenet

const MembersPannel = (props: {
  refetch: () => void;
  channels: IConversation[];
}) => {
  const { refetch, channels } = props;
  const { activeTab } = useContext(convContext);

  return (
    <Box
      sx={{
        background: "linear-gradient( #171221 10%, #171328 80.61%)",
        display: "grid",
        alignContent: "space-between",
        gridTemplateRows: " auto min-content",
      }}
    >
      {activeTab > 0 ? (
        <FriendsList />
      ) : (
        <MemberList refetch={refetch} channels={channels} />
      )}
    </Box>
  );
};

export default MembersPannel;
