import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { avatarStyle } from "./style";

interface IFDm {
  name: string;
  status: string;
  conversation_id: number;
}

interface Props {
  dm: IFDm;
}

const DmCard = (props: Props) => {
  const { dm } = props;

  return (
    <Box sx={{ p: "5px 6px", cursor: "pointer" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          p: "14px",
          // backgroundColor: `${"#1B182C"}`,
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
            {dm.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DmCard;
