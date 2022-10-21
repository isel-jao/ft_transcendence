import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { IFuser } from "../../types";

const usercard = (props: { user: IFuser }) => {
  const { user } = props;
  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        gap: "10px",
        padding: "4px 0px",
      }}
    >
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography>{user.name}</Typography>
    </Box>
  );
};

export default usercard;
