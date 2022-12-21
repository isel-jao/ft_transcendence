import React, { createContext, useEffect, useState } from "react";
import { IConversation, IDm } from "../types";

export const convContext = createContext({
  selected: {
    name: "",
    type: "",
    id: 0,
  }, // the selected conversation dm or room
  setSelected: (conversation: IConversation) => {},
  searchOn: false,
  setSearchOn: (n: boolean) => {},
  activeTab: 0,
  handleTabChange: (_: any, value: number) => {},
});

export const SelectedConversationProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<IConversation>({});
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
