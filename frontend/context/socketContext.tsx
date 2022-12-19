import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";
import Router from "next/router";

type Position = {
  x: Number;
  y: Number;
  z: Number;
};
type GameDataType = {
  ball: Position;
  player1: Position;
  player2: Position;
  speed: Number;
  score: {
    player1: Number;
    player2: Number;
  };
};
type RoomDataType = {
  player1: string;
  player2: string;
  roomName: string;
  status: string;
};
interface AppContextInterface {
  socket: Socket;
  gameData: GameDataType;
  roomData: RoomDataType;
}
export const AppCtx = createContext<AppContextInterface | null>(null);
const socket: Socket = io("http://localhost:5000", {
  query: {
    // token:
    // typeof window != undefined ? window.localStorage.getItem("token") : null,
  },
});
export const SocketContext = ({ children }: any) => {
  const [roomData, setRoom] = useState<RoomDataType>({
    player1: "",
    player2: "",
    roomName: "",
    status: "",
  });
  const [gameData, setData] = useState<GameDataType>({
    ball: {
      x: 0,
      y: 0,
      z: 1,
    },
    player1: {
      x: 0,
      y: -60 / 2 + 3,
      z: 0,
    },
    player2: {
      x: 0,
      y: 60 / 2 - 3,
      z: 0,
    },
    speed: 0.1,
    score: {
      player1: 0,
      player2: 0,
    },
  });
  socket.on("joinRoom", (data: RoomDataType) => {
    setRoom(data);
    Router.push("/game/" + data.roomName);
  });
  useEffect(() => {
    socket.on("gameData", (data: GameDataType) => {
      console.log(data);
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
        roomData,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
