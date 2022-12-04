import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { IFMessage } from "../../types";
import { format } from "date-fns";
import useConversationMessages from "../../hooks/useConversationMessages";

const messageBox = (props: { message: IFMessage }) => {
  const { message } = props;

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
        <Avatar
          sx={{
            width: 24,
            height: 24,
            "&.MuiAvatar-root": {
              position: "static",
            },
          }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            mr: "6px",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Typography>{`${message.sentBy.firstName} ${message.sentBy.lastName}`}</Typography>
          <Typography variant="subtitle1">
            {format(new Date(message.createdAt), "EEE, hh:mm a")}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#4D38A1",
            // "#1A172A", "#151D2E",
            width: "fit-content",
            borderRadius: "10px",
            p: "6px 10px",
          }}
        >
          <Typography>{message.body}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default messageBox;
