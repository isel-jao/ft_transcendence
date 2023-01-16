import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const server_url = "http://localhost:5000";

const socket: Socket = io(server_url, {
  //   autoConnect: false,
  query: {
    id: 1, // TODO change this
  },
});
console.log(socket);
export const webSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = ({ children }: any) => {
  // Api calls
  return (
    <webSocketContext.Provider value={socket}>
      {children}
    </webSocketContext.Provider>
  );
};
