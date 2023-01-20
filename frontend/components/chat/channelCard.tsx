import { Box, Avatar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { IConversation } from "../../context/types";
import { convContext } from "../../context/selectedConversationContext";

const ChannelCard = (props: {
  channel: IConversation;
  join?: Boolean;
  disabledSelect?: Boolean;
}) => {
  const { channel } = props;

  const { selected, setSelected } = useContext(convContext);

  const handelSelectChannel = (channel: IConversation) => {
    setSelected(channel);
  };

  return (
    <Box
      key={channel?.id}
      sx={{ p: "5px 6px", cursor: "pointer" }}
      onClick={() => {
        handelSelectChannel(channel);
      }}
    >
      {/* <pre>{JSON.stringify(channel.name, null, 2)}</pre> */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          backgroundColor: `${
            channel.id == selected?.id ? "#1B182C" : "transparent"
          }`,
          p: "14px",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Avatar
            sx={{ backgroundColor: "#413A4E" }}
            variant="square"
            children={`${channel.name.split(" ")[0][0].toUpperCase()}${
              channel.name.split(" ")[1]
                ? channel.name.split(" ")[1][0].toUpperCase()
                : ""
            }`}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: "14px",
              color: "#9C9A8C",
              textTransform: "capitalize",
            }}
          >
            {channel.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelCard;
