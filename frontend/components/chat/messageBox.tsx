import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { IFMessage } from "../../types";

const messageBox = (props: { message: IFMessage; send_by: string }) => {
  const { message, send_by } = props;

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
            gap: "10px",
          }}
        >
          <Typography>{send_by}</Typography>
          <Typography variant="subtitle1">{message.date}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#1A172A",
            // backgroundColor: "#151D2E",
            width: "fit-content",
            borderRadius: "10px",
            p: "6px 10px",
          }}
        >
          <Typography>{message.message_body}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default messageBox;
