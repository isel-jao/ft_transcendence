import { Box, debounce, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import { IFchannel } from "../../types";

const ChannelCard = (props: {
  channel: IFchannel;
  setSelectChannel: Function;
  selectChannel: IFchannel;
  join?: Boolean;
  disabledSelect?: Boolean;
}) => {
  const { selectChannel, setSelectChannel, channel } = props;

  const handelSelectChannel = (channel: IFchannel) => {
    setSelectChannel(channel);
  };

  return (
    <Box
      key={channel?.id}
      sx={{ p: "5px 6px", cursor: "pointer" }}
      onClick={() => {
        handelSelectChannel(channel);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          backgroundColor: `${
            channel.id == selectChannel?.id ? "#1B182C" : "transparent"
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
