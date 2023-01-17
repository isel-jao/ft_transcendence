import React, { createContext, useEffect, useState } from "react";
import { IConversation, IDm } from "../types";

export interface convContextxDTO {
  selected: null | IConversation;
  setSelected: (conversation: IConversation | null) => void;
  searchOn: boolean;
  setSearchOn: (n: boolean) => void;
  activeTab: number;
  handleTabChange: (_: any, value: number) => void;
}

export const convContext = createContext<convContextxDTO>({
  selected: null, // the selected conversation dm or room
  setSelected: (conversation: IConversation | null) => {},
  searchOn: false,
  setSearchOn: (n: boolean) => {},
  activeTab: 0,
  handleTabChange: (_: any, value: number) => {},
});

export const SelectedConversationProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<IConversation | null>(null);
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
