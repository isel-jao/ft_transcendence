import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { IFMessage, IFuser } from "../../types";

const messageBox = (props: { message: IFMessage; user: IFuser }) => {
  const { message, user } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        // border: "1px solid black",
        p: "4px",
        m: "6px 14px",
      }}
    >
      <Box>
        <Avatar sx={{ width: 24, height: 24 }} />
      </Box>
      <Box>
        <Box
          sx={{
            mr: "6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{user.name}</Typography>
          <Typography variant="subtitle1">{message.date}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#F2F4F7",
            width: "fit-content",
            borderRadius: "10px",
            p: "4px",
          }}
        >
          <Typography>{message.message_body}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default messageBox;
