import {
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  DialogActions,
  TextField,
} from "@mui/material";
import React from "react";
import { IFchannel } from "../../types";
import { useDialog } from "../../hooks/useDialogue";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";
import { JOINCHANNEL, JOINPROTECETDCHANNEL } from "../../constants/constants";
import { status } from "../../types/index";
import { joinChannel } from "../../services/conversations";

//TODO please create a custom button component
//TODO  implement join channel backend
const JoinChannelCard = (props: { channel: IFchannel; refetch: () => {} }) => {
  const { channel, refetch } = props;
  const { show, hide, on } = useDialog();

  //TODO add notistak
  const joinChannelHandler = () => {
    const queryPayload = {
      conversation_id: channel.id,
      user_id: 1, //TODO to get from user zhen its done
    };

    joinChannel(queryPayload)
      .then((res) => {
        console.log({ res });
        hide();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        refetch();
      });
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
          />
        )}
        <DialogActions>
          <Button
            disableElevation={true}
            variant="contained"
            sx={{
              height: "25px",
              "&.MuiButton-root": {
                p: "0px",
                m: "0px",
              },
              backgroundColor: "#161c30",
              borderRadius: "6px",
            }}
            onClick={() => {
              hide();
            }}
          >
            <Typography
              sx={{
                color: "#479bea",
                textTransform: "none",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              Cancel
            </Typography>
          </Button>
          <Button
            disableElevation={true}
            variant="contained"
            sx={{
              height: "25px",
              "&.MuiButton-root": {
                p: "0px",
                m: "0px",
              },
              backgroundColor: "#161c30",
              borderRadius: "6px",
            }}
            onClick={() => {
              joinChannelHandler();
            }}
          >
            <Typography
              sx={{
                color: "#479bea",
                textTransform: "none",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              Join
            </Typography>
          </Button>
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
          <Button
            disableElevation={true}
            variant="contained"
            sx={{
              height: "25px",
              "&.MuiButton-root": {
                p: "0px",
                m: "0px",
              },
              backgroundColor: "#161c30",
              borderRadius: "6px",
            }}
            onClick={() => {
              show();
            }}
          >
            <Typography
              sx={{
                color: "#479bea",
                textTransform: "none",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              join
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinChannelCard;
