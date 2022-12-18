import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import MessageInput from "./MessageInput";
import Message from "./messageBox";
import { IFchannel, IFMessage } from "../../types";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { ITEM_HEIGHT } from "../../constants/constants";
import CustomButton from "./customButton";

const friendsList = [
  {
    userName: "yseil-joe",
  },
  {
    userName: "ouchenou",
  },
  {
    userName: "ymarji",
  },
  {
    userName: "moharras",
  },
  {
    userName: "fmehdaou",
  },
  {
    userName: "yseil-joe",
  },
  {
    userName: "ouchenou",
  },
  {
    userName: "ymarji",
  },
  {
    userName: "moharras",
  },
  {
    userName: "fmehdaou",
  },
];

const MessagesContainer = (props: {
  selectedChannel: IFchannel;
  messages: IFMessage[];
  setMessages: Function;
}) => {
  const [query, setQuery] = useState("");
  const { selectedChannel, messages, setMessages } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handelClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        display: "grid",
        gridTemplateRows: "min-content auto min-content",
        background: "linear-gradient( #171221 10%, #171328 80.61%)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ddd",
        },
      }}
    >
      <Box
        sx={{
          // p: "25px 15px",
          borderBottom: "1px solid #33334D",
          // position: "fixed",
          backgroundColor: "#171221",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h1">{selectedChannel?.name}</Typography>
          <IconButton
            onClick={(event) => {
              handleClick(event);
            }}
          >
            <GroupAddIcon htmlColor="#469DED" sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handelClose}
          sx={{
            "&.MuiMenu-paper": {
              backgroundColor: "#ddd",
            },
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              background: "linear-gradient( #171221 10%, #171328 80.61%)",
              width: "400px",
              border: "1px solid #2c1f3b",
            },
          }}
        >
          <Box sx={{ p: "10px 6px", display: "grid", gap: "10px" }}>
            <Typography
              sx={{
                color: "#928f87",
                fontSize: "15px",
                fontWeight: "200",
              }}
            >
              Select Friends
            </Typography>
            <Typography
              sx={{
                color: "#479bea",
                textTransform: "none",
                fontWeight: "500",
                letterSpacing: "0.5px",
                fontSize: "10px",
              }}
            >
              you can add more friends to this channel
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#1b1625",
                    borderRadius: "4px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#479bea",
                    height: "15px",
                  },
                }}
                placeholder="type the username of a friend"
                onChange={(event) => {
                  setQuery(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <CustomButton
                title="Add"
                height="33px"
                onClick={() => {
                  console.log("need implementation");
                }}
              />
            </Box>

            {/* TODO friends list from backend*/}
            {friendsList
              .filter((item) =>
                item.userName.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, index) => (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "#1B182C",
                      borderRadius: "4px",
                    },
                  }}
                  key={index}
                  onClick={() => {
                    console.log("handel select friend");
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: "0px",
                    }}
                  >
                    <Typography sx={{ color: "#fff" }}>
                      {item.userName}
                    </Typography>
                    <Checkbox
                      // disableRipple
                      size="small"
                      sx={{
                        "&.Mui-checked": {
                          color: "#7d4ddc",
                        },
                      }}
                    />
                  </Box>
                </MenuItem>
              ))}
          </Box>
        </Menu>
      </Box>
      <Box>
        {messages &&
          messages.map((item, index) => {
            return <Message key={index} message={item} />;
          })}
      </Box>
      <Box sx={{ alignSelf: "end" }}>
        <MessageInput
          selectedChannel={selectedChannel?.id}
          messages={messages}
          setMessages={setMessages}
        />
      </Box>
    </Box>
  );
};

export default MessagesContainer;
