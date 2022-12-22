import React, { useContext, useEffect } from "react";
import { Box, Typography, Button, Divider, DialogActions } from "@mui/material";
import { deleteConversationById } from "../../services/conversations";
import { IConversation } from "../../types";
import { useDialog } from "../../hooks/useDialogue";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";
import CustomButton from "./customButton";
import { convContext } from "../../context/selectedConversationContext";
import Usercard from "./usercard";
import DmCard from "./dmCard";
import { useFriends } from "../../hooks/useFriends";
import FriendsList from "./friends-list";

const Mocked_data_members = [
  { user_name: "fmehdaou", status_user: "online", role: "owner" },
  { user_name: "isel-user", status_user: "offline", role: "admin" },
  { user_name: "yarji", status_user: "offline", role: "member" },
];

const MembersContainer = (props: {
  refetch: () => void;
  channels: IConversation[];
}) => {
  const { refetch, channels } = props;
  const { selected, setSelected } = useContext(convContext);
  const { show, hide, on } = useDialog();
  const { activeTab } = useContext(convContext);
  const { data: friends } = useFriends();

  const leaveChannelHandler = () => {
    deleteConversationById(selected?.id)
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
        setSelected(channels[0]);
        hide();
      });
  };

  return (
    <Box
      sx={{
        // backgroundColor: "#231834",
        background: "linear-gradient( #171221 10%, #171328 80.61%)",
        // p: "20px",
        display: "grid",
        gridTemplateRows: " auto min-content",
      }}
    >
      {activeTab > 0 ? (
        <FriendsList />
      ) : (
        <>
          <Dialog open={on} onClose={hide}>
            <DialogTitle title="Leave channel" />
            <Box
              sx={{
                p: "10px",
              }}
            >
              <Typography>{`leave ${selected?.name} channel?`}</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#632DE9" }} />
            <DialogActions>
              <CustomButton title="Stay" onClick={hide} />
              <CustomButton title="Leave" onClick={leaveChannelHandler} />
            </DialogActions>
          </Dialog>
          <Box sx={{ p: "61px 10px 4px" }}>
            <Box>
              <Typography variant="h2">Owners</Typography>
              {Mocked_data_members.filter(
                (member) => member.role == "owner"
              ).map((item, index) => (
                <Usercard
                  key={index}
                  user={{ name: item.user_name, status: item.status_user }}
                  type="room"
                />
              ))}
            </Box>
            <Box>
              <Typography variant="h2">Admins</Typography>
              {Mocked_data_members.filter(
                (member) => member.role == "admin"
              ).map((item, index) => (
                <Usercard
                  key={index}
                  user={{ name: item.user_name, status: item.status_user }}
                  type="room"
                />
              ))}
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
              m: "20px 20px",
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
              <CustomButton onClick={show} title={"Leave Channel"} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MembersContainer;
