import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

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
interface userDataInterface {
  id: number;
  username: string;
}
type RoomDataType = {
  player1: string;
  player2: string;
  roomName: string;
  winner?: string;
  status: string;
};
interface AppContextInterface {
  socket: Socket;
  gameData: GameDataType;
  userData: userDataInterface | null;
  roomData: RoomDataType;
}

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";
export const AppCtx = createContext<AppContextInterface | null>(null);

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
        player1: 0,
        player2: 0,
      },
    });
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
  socket.on("gameOver", (data) => {
    const { status, player1, player2 } = data;
    setRoom({
      ...roomData,
      status: status,
      winner: player1 === 10 ? roomData.player1 : roomData.player2,
    });
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
    };
  }, [gameData.ball]);

  return (
    <AppCtx.Provider
      value={{
        socket,
        gameData,
        userData,
        roomData,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};
