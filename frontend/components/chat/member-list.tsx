import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  DialogActions,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import useMembers from "../../hooks/useMembers";
import CustomButton from "./customButton";
import { Dialog, DialogTitle, useDialog } from "../../hooks/useDialogue";
import { IConversation, IMember } from "../../types";
import { convContext } from "../../context/selectedConversationContext";
import { LEAVECHANNEL, USERSETTING } from "../../constants/constants";
import MoreIcon from "@mui/icons-material/MoreVert";
import { leaveConversation } from "../../services/conversations";

const ITEM_HEIGHT = 48;

//TODO add type
const MemberList = (props: {
  channels: IConversation[];
  setChannels: Function;
}) => {
  const { data: members } = useMembers();
  const { show, hide, on } = useDialog();
  const { setChannels, channels } = props;
  const { selected, setSelected } = useContext(convContext);

  const leaveChannelHandler = () => {
    if (selected) {
      leaveConversation(selected?.id)
        .then((res) => {
          setChannels((prev: IConversation[]) => {
            const updates = prev.filter((item) => {
              return item.id != res.conversationId;
            });
            return updates;
          });
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          setSelected(channels.length == 0 ? null : channels[0]);
          hide();
        });
    }
  };

  useEffect(() => {
    return console.log(channels);
  }, [channels, setChannels]);

  return (
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
          members?.map((member: any, index) => {
            return (
              <Box
                sx={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
                key={index}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
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
                    {`${member.firstName} ${member.lastName}`}
                  </Typography>
                </Box>
                <UserSetting member={member} />
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
          {LEAVECHANNEL}
        </Typography>
        <Box sx={{ placeSelf: "center" }}>
          <CustomButton onClick={show} title={"Leave Channel"} />
        </Box>
      </Box>
    </>
  );
};

const UserSetting = (props: { member: IMember }) => {
  const { member } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            background: "#221833",
            width: "250px",
            border: "1px solid #2c1f3b",
          },
        }}
      >
        <Typography
          sx={{
            color: "#479bea",
            textTransform: "none",
            fontWeight: "500",
            fontSize: "12px",
            p: "10px",
          }}
        >
          {USERSETTING}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuItem>{`Block ${member?.firstName}`}</MenuItem>
          <Switch size="small" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuItem>Mute user</MenuItem>
          <Switch size="small" />
        </Box>
      </Menu>
    </>
  );
};

export default MemberList;
