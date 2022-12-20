import React, { useContext, useEffect } from "react";
import { Box, Typography, Avatar, Select, IconButton } from "@mui/material";
import { avatarStyle } from "./style";
import { convContext } from "../../context/selectedConversationContext";
import { IDm } from "../../types";
import MsgIcon from "@mui/icons-material/ChatBubble";

// "conversationId": 32,
// "firstName": "youssef",
// "lastName": "marji",
// "userName": "ymarji"

interface Props {
  dm: IDm;
  // if action true, a message icon will be showen
  action?: Boolean;
}

const DmCard = (props: Props) => {
  const { dm, action = false } = props;
  const { selected, setSelected } = useContext(convContext);

  const selecetDmHandler = (dm: IDm) => {
    setSelected(dm);
  };

  const actionDmHandler = (dm: IDm) => {
    setSelected({});
    // console.log("implementation need here", selected);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
            dm.conversationId == selected?.conversationId && !action
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
              <IconButton
                onClick={() => {
                  console.log("need implementation");
                }}
              >
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
