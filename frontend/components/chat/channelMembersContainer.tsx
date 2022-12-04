import React from "react";
import { Box, Typography, Button, Divider, DialogActions } from "@mui/material";
import Usercard from "./userCard";
import { deleteConversationById } from "../../services/conversations";
import { IFchannel } from "../../types";
import { useDialog } from "../../hooks/useDialogue";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";

const Mocked_data_members = [
  { user_name: "fmehdaou", status_user: "online", role: "owner" },
  { user_name: "isel-user", status_user: "offline", role: "admin" },
  { user_name: "yarji", status_user: "offline", role: "member" },
];

const ChannelMembersContainer = (props: {
  selectedChannel: IFchannel;
  refetch: () => void;
  setSelectChannel: Function;
  setMessages: Function;
  channels: IFchannel[];
}) => {
  const { selectedChannel, refetch, setSelectChannel, setMessages, channels } =
    props;

  const { show, hide, on } = useDialog();

  const leaveChannelHandler = () => {
    deleteConversationById(selectedChannel.id)
      .then((res) => {
        //TODO show message of succ
        refetch();
        // setSelectChannel(channels[0]);
        // hide();
      })
      .catch((err) => {
        //TODO she message of fail
      })
      .finally(() => {
        setSelectChannel(channels[0]);

        hide();
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#231834",
        p: "20px",
        display: "grid",
        gridTemplateRows: "auto min-content",
      }}
    >
      <Dialog open={on} onClose={hide}>
        <DialogTitle title="Leave channel" />
        <Box
          sx={{
            p: "10px",
          }}
        >
          <Typography>{`leave ${selectedChannel?.name} channel?`}</Typography>
        </Box>
        <Divider sx={{ backgroundColor: "#632DE9" }} />
        <DialogActions>
          <Button
            onClick={() => {
              hide();
            }}
            sx={{
              color: "#fff",
              backgroundColor: "#6344D9",
            }}
          >
            Stay
          </Button>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#6344D9",
            }}
            onClick={() => {
              leaveChannelHandler();
            }}
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ p: "61px 10px 4px" }}>
        {/* <Typography>Chat Members</Typography> */}
        <Box>
          <Typography variant="h2">Owners</Typography>
          {Mocked_data_members.filter((member) => member.role == "owner").map(
            (item) => (
              <Usercard
                user={{ name: item.user_name, status: item.status_user }}
                type="room"
              />
            )
          )}
        </Box>
        <Box>
          <Typography variant="h2">Admins</Typography>
          {Mocked_data_members.filter((member) => member.role == "admin").map(
            (item) => (
              <Usercard
                user={{ name: item.user_name, status: item.status_user }}
                type="room"
              />
            )
          )}
        </Box>
        <Box>
          <Box>
            <Typography variant="h2">Members</Typography>
            {Mocked_data_members.filter(
              (member) => member.role == "member"
            ).map((item, index) => (
              <Usercard
                key={index}
                user={{ name: item.user_name, status: item.status_user }}
                type="room"
              />
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#1C1625",
          p: "20px",
          borderRadius: "10px",
          display: "grid",
          gap: "10px",
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
          leaving channel will delete it from your channels list
        </Typography>

        <Box sx={{ placeSelf: "center" }}>
          <Button
            sx={{
              height: "25px",
              backgroundColor: "#161c30",
              borderRadius: "20px solid #161224",
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
                placeSelf: "center",
              }}
            >
              Leave Channel
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelMembersContainer;
