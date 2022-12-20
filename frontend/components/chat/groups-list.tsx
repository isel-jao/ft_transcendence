import React, { useState, useEffect, useMemo, useContext } from "react";
import { Box, IconButton, Tooltip, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { IConversation } from "../../types";
import { isEmpty } from "lodash";
import ChannelCard from "./channelCard";
import JoinChannelCard from "./joinChannelCard";
import UseAllConversations from "../../hooks/useAllConversations";
import { convContext } from "../../context/selectedConversationContext";

const GroupList = (props: {
  channels: IConversation[];
  show: () => void;
  refetch: Function;
}) => {
  const { channels, show, refetch: refetchConversations } = props;
  const [query, setQuery] = useState<string>("");
  const { data: joiningChannels, refetch: refetchJoiningChannels } =
    UseAllConversations();
  const { searchOn, setSearchOn } = useContext(convContext);

  // const { refetch: refetchConversations } = useConversations();

  const searchHandlerOn = () => {
    setSearchOn(!searchOn);
    refetchConversations();
    refetchJoiningChannels();
  };

  const searchHandler = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    console.log({ joiningChannels });
  }, []);

  return (
    <Box sx={{}}>
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
          <ChannelCard key={index} channel={channel} />
        ))}
      {searchOn && (
        <Box>
          {joiningChannels.length > 0 ? (
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
              })
          ) : (
            <Typography>No channels found to join</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GroupList;
