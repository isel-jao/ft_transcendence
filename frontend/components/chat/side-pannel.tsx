import React, { useState, useMemo, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { IConversation } from "../../types";
import CustomTabs, { TabType } from "./tabs";
import GroupList from "./groups-list";
import DmList from "./dm-list";

const SidePannel = (props: {
  channels: IConversation[];
  show: () => void;
  refetch: Function;
}) => {
  const { channels, show, refetch } = props;
  const tabs: TabType[] = useMemo(
    () => [
      {
        label: "Groups",
        content: () => (
          <GroupList channels={channels} show={show} refetch={refetch} />
        ),
      },
      {
        label: "Direct Messages",
        content: () => <DmList />,
      },
    ],
    [channels]
  );

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        background: "linear-gradient( #171221 10%, #171328 80.61%)",
        p: "10px",
      }}
    >
      <CustomTabs tabs={tabs} label="label" />
    </Box>
  );
};

export default SidePannel;
