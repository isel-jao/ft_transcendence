import {
  Box,
  Avatar,
  Typography,
  Divider,
  DialogActions,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { IConversation } from "../../types";
import { useDialog } from "../../hooks/useDialogue";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";
import { JOINCHANNEL, JOINPROTECETDCHANNEL } from "../../constants/constants";
import { status } from "../../types/index";
import CustomButton from "./customButton";
import { webSocketContext } from "../../context/socketChatContext";

//TODO types hereeee
const JoinList = (props: { channel: IConversation; refetch: Function }) => {
  const { channel, refetch } = props;
  const [passwordInput, setPasswordInput] = useState("");
  const { show, hide, on } = useDialog();
  const socket = useContext(webSocketContext);

  const passwordHandler = (value: string) => {
    setPasswordInput(value);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("onJoin", (newJoin: any) => {
      console.log({ newJoin });
      if (newJoin) {
        hide();
      }
    });

    return () => {
      socket.off("connect");
      socket.off("onJoin");
    };
  }, []);

  const joinChannelHandler = () => {
    const queryPayload = {
      id: channel.id,
      user_id: 1, //TODO to get from user when its done
      password: passwordInput,
    };
    socket.emit("newJoin", queryPayload);
  };

  return (
    <Box>
      <Dialog open={on} onClose={hide} sx={{ padding: "10px" }}>
        <DialogTitle title="Join the channel" />
        <Divider sx={{ backgroundColor: "#632DE9" }} />
        <Typography
          variant="body2"
          color="#4494de"
          align="center"
          sx={{
            p: "20px 10px",
          }}
        >
          {channel.status == status.PUBLIC ? JOINCHANNEL : JOINPROTECETDCHANNEL}
        </Typography>
        {channel.status != status.PUBLIC && (
          <TextField
            label="password"
            variant="outlined"
            type="password"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#221833",
                borderRadius: "10px",
              },
              "& .MuiInputBase-input": {
                color: "#479bea",
              },
            }}
            onChange={(event) => {
              passwordHandler(event.target.value);
            }}
          />
        )}
        <DialogActions>
          <CustomButton onClick={hide} title="Cancel" />
          <CustomButton onClick={joinChannelHandler} title="Join" />
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
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

        <Box>
          <CustomButton title="join" onClick={show} />
        </Box>
      </Box>
    </Box>
  );
};

export default JoinList;
