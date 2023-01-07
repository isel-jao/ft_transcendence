import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  DialogActions,
  Avatar,
} from "@mui/material";
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
import useMembers from "../../hooks/useMembers";

//TODO Add type to the componenet

const MembersContainer = (props: {
  refetch: () => void;
  channels: IConversation[];
}) => {
  const { refetch, channels } = props;
  const { selected, setSelected } = useContext(convContext);
  const { show, hide, on } = useDialog();
  const { activeTab } = useContext(convContext);
  const { data: members } = useMembers();

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
          <Box
            sx={{
              p: "10px",
              display: "grid",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                color: "#9b988c",
                fontSize: "14px",
              }}
            >
              Members
            </Typography>
            {members &&
              members?.map((memeber: any, index) => {
                return (
                  <Box sx={{ display: "flex", gap: "6px" }} key={index}>
                    <Avatar
                      sx={{
                        backgroundColor: "#413A4E",
                        width: 30,
                        height: 30,
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      {`${memeber.firstName} ${memeber.lastName}`}
                    </Typography>
                  </Box>
                );
              })}
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
