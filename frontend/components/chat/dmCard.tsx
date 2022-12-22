import React, { useContext, useEffect } from "react";
import { Box, Typography, Avatar, Select, IconButton } from "@mui/material";
import { avatarStyle } from "./style";
import { convContext } from "../../context/selectedConversationContext";
import { IDm } from "../../types";
import MsgIcon from "@mui/icons-material/ChatBubble";
import { webSocketContext } from "../../context/socketChatContext";

interface Props {
  dm: IDm;
  // if action true, a message icon will be showen
  action?: Boolean;
  setDms: any;
}

const DmCard = (props: Props) => {
  const { dm, action = false, setDms } = props;
  const { selected, setSelected } = useContext(convContext);
  const socket = useContext(webSocketContext);

  const selecetDmHandler = (dm: IDm) => {
    setSelected({
      id: dm.conversationId,
      name: dm.userName,
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.off("connect");
      socket.off("omDm");
    };
  }, []);

  const actionDmHandler = (dm: IDm) => {
    const user_id = 1; // TODO pleaaaase change this 1
    //TODO create conversation
    socket.emit("newDm", {
      type: "dm",
      senderId: user_id,
      recieverId: dm?.id,
    });

    socket.on("onDm", (data) => {
      setSelected({
        id: data.id,
        name: dm.userName,
        type: data.type,
        status: data.status,
      });
    });
  };

  return (
    <Box
      sx={{ p: "5px 6px", cursor: "pointer" }}
      onClick={() => {
        action ? actionDmHandler(dm) : selecetDmHandler(dm);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          p: "14px",
          backgroundColor: `${
            dm.conversationId == selected?.id && !action
              ? "#1B182C"
              : "transparent"
          }`,
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
              {dm.userName}
            </Typography>
          </Box>

          {action && (
            <Box
              sx={{
                borderRadius: "10px",
                backgroundColor: "rgb(121, 79, 206, 0.3)",
              }}
            >
              <IconButton>
                <MsgIcon htmlColor="" sx={{ fontSize: "13px" }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DmCard;
