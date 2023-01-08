import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useFriends } from "../../hooks/useFriends";
import DmCard from "./dmCard";

const FriendsList = () => {
  const { data } = useFriends(1); // TODO 1 is the userid change it

  return (
    <Box sx={{ p: "20px 0px" }}>
      <Box sx={{ pl: "20px" }}>
        <Typography sx={{ fontSize: "14px" }}>{`Friends`}</Typography>
      </Box>
      {data &&
        data.map((item, index) => (
          <DmCard key={index} dm={item} action={true} />
        ))}
    </Box>
  );
};

export default FriendsList;
