import React from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  Avatar,
  InputBase,
  Paper,
} from "@mui/material";
import { IFConversation } from "../../types";

//TODO change type
const MessageBorder = (props: { user: any }) => {
  const { user } = props;
  return (
    <Box
      sx={{
        p: "10px 10px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Avatar sx={{ width: 30, height: 30 }} />
      <Typography variant="h1">{user.name}</Typography>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "1px 6px",
          backgroundColor: "#EBFDF4",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#16B66A",
            height: "6px",
            width: "6px",
            borderRadius: "50%",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: "#44886A",
          }}
        >
          {user.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBorder;
