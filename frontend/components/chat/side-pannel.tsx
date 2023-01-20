import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { IConversation } from "../../context/types";
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
        background: "#000",
        p: "10px",
      }}
    >
      <CustomTabs tabs={tabs} label="label" />
    </Box>
  );
};

export default SidePannel;
