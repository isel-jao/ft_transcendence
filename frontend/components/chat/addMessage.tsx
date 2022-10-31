import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddMessage = () => {
  return (
    <Box
      sx={{
        // position: "fixed",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #ddd",
        p: "10px",
      }}
    >
      <Typography variant="h2">Messages</Typography>
      <IconButton
        sx={{
          "&.MuiButtonBase-root": {
            padding: "0px",
          },
        }}
        //TODO need implementation
        onClick={() => {
          // console.log("add in direct message  clicked");
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddMessage;
