import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DmCard from "./dmCard";
import { useDms } from "../../hooks/useDms";
import useConversationMessages from "../../hooks/useConversationMessages";
import { convContext } from "../../context/selectedConversationContext";

const DmList = () => {
  //TODO 1 is user_id to be taken from the auth
  const { data: dms, setData: setDms } = useDms({ user_id: 1 });

  return (
    <Box>
      {dms.length == 0 && (
        <Box sx={{ p: "20px 0px" }}>
          <Typography align="center">
            No conversations found, Start new ones
          </Typography>
        </Box>
      )}
      <Box>
        {dms && dms.map((item, index) => <DmCard key={index} dm={item} />)}
      </Box>
    </Box>
  );
};

export default DmList;
