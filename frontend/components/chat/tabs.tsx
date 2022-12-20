// import { Box, styled } from "@mui/system";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { Box, Tab, TabProps, Tabs, Typography, styled } from "@mui/material";
import { convContext } from "../../context/selectedConversationContext";

interface TabType {
  label: string;
  content: FunctionComponent<{}>;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabType[];
  label: string;
  tabsProps?: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  label: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, label, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const CustomTab = styled((props: TabProps) => <Tab {...props} />)(() => ({
  "&.Mui-selected": {
    // backgroundColor: "#ddd",
    // borderRadius: "4px",
  },
}));

const StyledTabs = styled((props: any) => <Tabs {...props} />)(() => ({
  width: "fit-content",
  "& .Mui-selected": {
    color: "transparent",
  },
  "& .MuiTabs-scroller": {
    // backgroundColor: "#ddd",
    // padding: "2px",
    // borderRadius: "4px",
    // color: "#808080",
  },
  "& .MuiTabs-indicator": {
    // display: "none",
    backgroundColor: "#794fce",
    height: 3,
  },
}));

const CustomTabs = ({ tabs = [], label: tabLabel, tabsProps }: TabsProps) => {
  const { activeTab, handleTabChange } = useContext(convContext);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <StyledTabs
          {...tabsProps}
          variant="scrollable"
          scrollButtons={"auto"}
          value={activeTab}
          onChange={handleTabChange}
        >
          {tabs.map(({ label, disabled = false }, index) => (
            <CustomTab
              disabled={disabled}
              key={`tab-${label}`}
              label={
                <Typography
                  sx={{
                    textTransform: "capitalize",
                  }}
                  variant="subtitle1"
                >
                  {label}
                </Typography>
              }
            />
          ))}
        </StyledTabs>
      </Box>
      {tabs.map(({ content: Content, label }, index) => (
        <TabPanel
          label={tabLabel}
          key={`tabpanel-${label}`}
          value={activeTab}
          index={index}
        >
          <Content />
        </TabPanel>
      ))}
    </Box>
  );
};

export default CustomTabs;
export type { TabsProps, TabPanelProps, TabType };
