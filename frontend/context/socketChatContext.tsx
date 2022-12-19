import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const server_url = process.env.NEXT_PUBLIC_API ?? "";

const socket = io(server_url, {
  //   autoConnect: false,
  query: {
    id: 1,
  },
});
export const webSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = ({ children }: any) => {
  // Api calls
  return (
    <webSocketContext.Provider value={socket}>
      {children}
    </webSocketContext.Provider>
  );
};
