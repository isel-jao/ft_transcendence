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

const MessageBorder = (props: { conversation: IFConversation }) => {
  const { conversation } = props;
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
      <Typography variant="h1">{conversation.sent_by.name}</Typography>
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
          {conversation.sent_by.status}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBorder;
