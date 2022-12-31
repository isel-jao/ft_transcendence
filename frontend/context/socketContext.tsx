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
const socket: Socket = io("http://localhost:3001", {
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
    score: {
      player1: 0,
      player2: 0,
    },
  });
  socket.on("joinRoom", (data: RoomDataType) => {
    console.log("DATA", data);
    setRoom(data);
    Router.push("/game/" + data.roomName);
  });
  socket.on("leftGame", (data) => {});
  socket.on("gameOver", (data) => {
    const { status, player1, player2 } = data;
    setRoom({ ...roomData, status: status });
    setData({
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
      socket.off("leftGame");
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
