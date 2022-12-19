import React, { useContext } from "react";
import { Box, Typography, Avatar, Select } from "@mui/material";
import { avatarStyle } from "./style";
import { convContext } from "../../context/selectedConversationContext";
import { IDm } from "../../types";

// "conversationId": 32,
// "firstName": "youssef",
// "lastName": "marji",
// "userName": "ymarji"

const DmCard = (props: { dm: IDm }) => {
  const { dm } = props;
  const { selected, setSelected } = useContext(convContext);

  const selecetDmHandler = (dm: IDm) => {
    setSelected(dm);
  };

  return (
    <Box
      sx={{ p: "5px 6px", cursor: "pointer" }}
      onClick={() => {
        selecetDmHandler(dm);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          p: "14px",
          backgroundColor: `${
            dm.conversationId == selected?.conversationId
              ? "#1B182C"
              : "transparent"
          }`,
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Avatar sx={avatarStyle} />
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              color: "#9C9A8C",
              textTransform: "capitalize",
            }}
          >
            {dm.userName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DmCard;
