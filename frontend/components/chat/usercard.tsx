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
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IFUser } from "../../types";

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
          sx={{ width: 30, height: 30 }}
          src="../../public/images/mocked-avatar-2.jpg"
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
        <Button
          disableElevation={true}
          variant="contained"
          sx={{
            height: "20px",
            "&.MuiButton-root": {
              p: "0px",
              m: "0px",
              backgroundColor: "#6344D9",
            },
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: "500",
              fontSize: "12px",
            }}
          >
            invite
          </Typography>
        </Button>
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
