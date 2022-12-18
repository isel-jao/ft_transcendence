import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {}

const ChannelTopBar = (props: Props) => {
  return (
    <Box
      sx={{
        display: "grid",
        p: "10px",
        gridTemplateColumns: "2fr 5fr 2fr",
      }}
    >
      <Box />
      <Box sx={{ p: "10px" }}>
        {/* <Typography variant="h1">{selectChannel?.name}</Typography> */}
      </Box>
      <Box />
    </Box>
  );
};

export default ChannelTopBar;
