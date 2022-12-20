import React, { createContext, useState } from "react";
import { IConversation } from "../types";

export const convContext = createContext({
  selected: {}, // the selected conversation dm or room
  setSelected: (conversation: object) => {},
  searchOn: false,
  setSearchOn: (n: boolean) => {},
  activeTab: 0,
  handleTabChange: (_: any, value: number) => {},
});

export const SelectedConversationProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<object>({});
  const [searchOn, setSearchOn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (_: any, newValue: number) => setActiveTab(newValue);

  return (
    <convContext.Provider
      value={{
        selected,
        setSelected,
        searchOn,
        setSearchOn,
        activeTab,
        handleTabChange,
      }}
    >
      {children}
    </convContext.Provider>
  );
};
