import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
// import axios from "axios";
import { intialValue } from "./helpers";
import { GameDataType, userDataInterface, RoomDataType } from "./types";
import { changeRoute } from "../hooks/changeRoute";
interface AppContextInterface {
  socket: Socket;
  gameData: GameDataType;
  userData: userDataInterface | null;
  roomData: RoomDataType;
  watchers: [string?];
}

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:3001";
// @ts-ignore
export const AppCtx = createContext<AppContextInterface>(null);

const socket: Socket = io("http://localhost:3001", {
  query: {
    // token:
    // typeof window != undefined ? window.localStorage.getItem("token") : null,
  },
});
export const SocketContext = ({ children }: any) => {
  const [userData, setUserData] = useState<userDataInterface | null>(null);
  const [roomData, setRoom] = useState<RoomDataType>({
    player1: "",
    player2: "",
    roomName: "",
    status: "",
    winner: "",
    type: "hard",
  });
  const [watchers, setWatchers] = useState<[string?]>([]);
  const [gameData, setData] = useState<GameDataType>(intialValue);
  const [changed, init] = changeRoute();

  useEffect(() => {
    if (changed && roomData.roomName)
      socket.emit("leftRoom", { roomName: roomData.roomName });
    return () => init();
  }, [changed]);
  socket.on("joinRoom", (data: RoomDataType) => {
    setData(intialValue);
    setRoom(data);
    Router.push("/game/" + data.roomName);
  });

  socket.on("leftGame", (data) => {
    setRoom({
      ...roomData,
      status: data.status,
      winner: data.player1 != "" ? roomData.player1 : roomData.player2,
    });
  });

  useEffect(() => {
    socket.on("watcher", (data) => {
      const { socketId, type, roomName, watchersRoom } = data;
      if (type != "LEAVE") {
        setRoom({ ...roomData, roomName });
        setWatchers([watchersRoom]);
      } else {
        let newArray: [string?] = watchers.filter((e) => e != socketId);
        setWatchers([...newArray]);
      }
      console.log(watchers);
    });
    socket.on("error", () => {
      Router.push("/game/");
    });
    return () => {
      socket.off("watcher");
      socket.off("error");
    };
  }, []);
  socket.on("gameOver", (data) => {
    const { status, player1, player2 } = data;
    setRoom({
      ...roomData,
      status: status,
      winner: player1 === 10 ? roomData.player1 : roomData.player2,
    });
    setData({
      ...intialValue,
      score: {
        player1: player1,
        player2: player2,
      },
    });
  });
  useEffect(() => {
    socket.on("gameData", (data: GameDataType) => {
      setData(data);
    });
    return () => {
      socket.off("gameData");
    };
  }, [gameData.ball]);

  return (
    <AppCtx.Provider
      value={{
        socket,
        gameData,
        userData,
        roomData,
        watchers,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
