import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  DialogActions,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import image from "../../public/images/mocked-avatar-2.jpg";
import { IFUser } from "../../types";
import CustomButton from "./customButton";

//where type refers to room or dm
const Usercard = (props: { user: any; type: string }) => {
  const { user } = props;
  const [selectedUserId, setSelectedUserId] = useState<number>();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "10px 0px",
        m: "10px 4px",
        // p: "10px",
        // backgroundColor: "#F9FAFC",
        // borderLeft: "2px solid #00B0B6",
        cursor: "pointer",
        borderBottom: "1px solid #33334D",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Avatar
          sx={{ width: 30, height: 30 }}
          onClick={() => {
            console.log("implemet view profil");
          }}
        />

        <Box sx={{ display: "grid" }}>
          <Typography
            variant="body1"
            sx={{ color: "#7E4EE0", fontWeight: "600" }}
          >
            {user.name}
          </Typography>
          <Typography variant="subtitle2">{user.status}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CustomButton title="invite" />
        <IconButton
          sx={{ color: "#fff" }}
          onClick={() => {
            console.log(
              "todo: implement set as admin, bad or mute for a limited time"
            );
          }}
        >
          <Tooltip title="user setting">
            <MoreVertIcon />
          </Tooltip>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Usercard;
