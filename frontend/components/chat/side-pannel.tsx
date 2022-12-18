import React, { useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { IFchannel } from "../../types";
import CustomTabs, { TabType } from "./tabs";
import GroupList from "./groups-list";
import DmList from "./dm-list";

const SidePannel = (props: {
  channels: IFchannel[];
  selectChannel: IFchannel;
  setSelectChannel: Function;
  show: () => void;
  refetch: Function;
}) => {
  const { channels, setSelectChannel, show, selectChannel, refetch } = props;
  const tabs: TabType[] = useMemo(
    () => [
      {
        label: "Groups",
        content: () => (
          <GroupList
            channels={channels}
            setSelectChannel={setSelectChannel}
            selectChannel={selectChannel}
            show={show}
            refetch={refetch}
          />
        ),
      },
      {
        label: "Direct Messages",
        content: () => <DmList />,
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState<number>(1);
  const handleTabChange = (_: any, newValue: number) => setActiveTab(newValue);

  return (
    <Box
      sx={{
        borderRight: "2px solid #2C2039",
        background: "linear-gradient( #171221 10%, #171328 80.61%)",
        p: "10px",
      }}
    >
      <CustomTabs
        tabs={tabs}
        label="label"
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
    </Box>
  );
};

export default SidePannel;
