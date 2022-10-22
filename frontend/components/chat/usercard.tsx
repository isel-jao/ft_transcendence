import React from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { IFuser } from "../../types";

const usercard = (props: { user: IFuser }) => {
  const { user } = props;
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "4px 0px",
        m: "8px 4px",
        p: "4px 10px",
        backgroundColor: "#F9FAFC",
        borderLeft: "2px solid #7F56DA",
      }}
    >
      <Avatar sx={{ width: 24, height: 24 }} />

      <Typography>{user.name}</Typography>
    </Box>
  );
};

export default usercard;
