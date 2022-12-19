import React, { createContext, useState } from "react";
import { IConversation } from "../types";

export const convContext = createContext({
  selected: {},
  setSelected: (conversation: object) => {},
  searchOn: false,
  setSearchOn: (n: boolean) => {},
});

export const SelectedConversationProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<object>({});
  const [searchOn, setSearchOn] = useState<boolean>(false);

  return (
    <convContext.Provider
      value={{ selected, setSelected, searchOn, setSearchOn }}
    >
      {children}
    </convContext.Provider>
  );
};
