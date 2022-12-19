import React, { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DmCard from "./dmCard";
import { convContext } from "../../context/selectedConversationContext";
import { useDms } from "../../hooks/useDms";

const DmList = () => {
  //TODO 1 is user_id to be taken from the auth
  const { data: dms, setData } = useDms({ user_id: 1 });

  return (
    <Box>
      <Box>
        {dms.map((item, index) => (
          <DmCard key={index} dm={item} />
        ))}
      </Box>
    </Box>
  );
};

export default DmList;
