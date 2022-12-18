import React, { useState, useEffect, useMemo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  debounce,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { IFchannel } from "../../types";
import { isEmpty } from "lodash";
import ChannelCard from "./channelCard";
import JoinChannelCard from "./joinChannelCard";
import UseAllConversations from "../../hooks/useAllConversations";
import { useConversations } from "../../hooks/useConversations";
import CustomTabs, { TabType } from "./tabs";

const GroupList = (props: {
  channels: IFchannel[];
  selectChannel: IFchannel;
  setSelectChannel: Function;
  show: () => void;
  refetch: Function;
}) => {
  const {
    channels,
    setSelectChannel,
    show,
    selectChannel,
    refetch: refetchConversations,
  } = props;
  const [searchOn, setSearchOn] = useState<Boolean>(false);
  const [query, setQuery] = useState<string>("");
  const {
    data: joiningChannels,
    setData: setJoiningChannels,
    refetch: refetchJoiningChannels,
  } = UseAllConversations();

  // const { refetch: refetchConversations } = useConversations();

  const searchHandlerOn = () => {
    setSearchOn(!searchOn);
    refetchConversations();
    refetchJoiningChannels();
  };

  const searchHandler = (value: string) => {
    setQuery(value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "3fr 1fr",
          p: "20px  0px",
        }}
      >
        {!searchOn ? (
          <Typography>Chats</Typography>
        ) : (
          <TextField
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#1b1625",
                borderRadius: "10px",
              },

              "& .MuiInputBase-input": {
                color: "#479bea",
              },
            }}
            placeholder="search for channels to join"
            onChange={(event) => {
              searchHandler(event.target.value);
            }}
          />
        )}
        <Box
          sx={{
            display: "felx",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => show()}>
            <Tooltip title="create new channel">
              <AddIcon htmlColor="#6445DF" fontSize="small" />
            </Tooltip>
          </IconButton>
          <IconButton onClick={searchHandlerOn}>
            <Tooltip title=" search for channels to join">
              <SearchIcon htmlColor="#6445DF" fontSize="small" />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>
      {!searchOn &&
        channels.map((channel, index) => (
          <ChannelCard
            key={index}
            selectChannel={selectChannel}
            setSelectChannel={setSelectChannel}
            channel={channel}
          />
        ))}
      {searchOn && (
        <Box>
          {joiningChannels &&
            joiningChannels
              .filter(
                (channel) =>
                  isEmpty(channel) ||
                  channel.name.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, index) => {
                return (
                  <JoinChannelCard
                    key={index}
                    channel={item}
                    refetch={refetchJoiningChannels}
                  />
                );
              })}
        </Box>
      )}
    </Box>
  );
};

export default GroupList;
