import { createContext, useState } from "react";

export const selecetdConversationContext = createContext({
  selected: 0,
  setSelected: (n: number) => {},
});

export const SelectedConversationProvider = () => {
  const [selected, setSelected] = useState(0);

  return (
    <selecetdConversationContext.Provider
      value={{ selected, setSelected }}
    ></selecetdConversationContext.Provider>
  );
};
