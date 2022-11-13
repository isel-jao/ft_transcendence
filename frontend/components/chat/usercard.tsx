import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { IFuser } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//where type refers to room or dm
const Usercard = (props: { user: IFuser; type: string }) => {
  const { user } = props;
  const [selectedUserId, setSelectedUserId] = useState<number>();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0px",
        m: "8px 4px",
        p: "4px",
        // backgroundColor: "#F9FAFC",
        // borderLeft: "2px solid #00B0B6",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={"../../public/images/mocked-avatar-2.jpg"}
          onClick={() => {
            console.log("implemet view profil");
          }}
        />
        <Box sx={{ display: "grid", gap: "3px" }}>
          <Typography variant="body2">{user.name}</Typography>
          <Typography>{user.status}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          sx={{ height: "20px", width: "10px", m: "0px" }}
        >
          <Typography sx={{ color: "#fff", textTransform: "none" }}>
            invite
          </Typography>
        </Button>
        <IconButton
          onClick={() => {
            console.log(
              "todo: implement set as admin, bad or mute for a limited time"
            );
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Usercard;
