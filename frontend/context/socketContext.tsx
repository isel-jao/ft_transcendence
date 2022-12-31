import { io } from "socket.io-client";
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
  speed: Number;
  score: {
    player1: Number;
    player2: Number;
  };
};
interface userDataInterface {
  id: number;
  username: string;
}
interface AppContextInterface {
  socket?: any | null;
  gameData: GameDataType;
  userData: userDataInterface | null;
}
export const AppCtx = createContext<AppContextInterface | null>(null);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";
const socket = io("http://localhost:3001");
export const SocketContext = ({ children }: any) => {
  const [userData, setUserData] = useState<userDataInterface | null>(null);
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
  socket.on("joinRoom", (data) => {
    alert("Match Found !");
    console.log(data);
    Router.push("/room/" + data.room);
  });
  useEffect(() => {
    console.log("HEREE");
    socket.on("gameData", (data: GameDataType) => {
      console.log(data);
      setData(data);
    });
    return () => {
      socket.off("gameData");
    };
  }, [gameData.ball]);
  const FetchData = async () => {
    try {
      const { data } = await axios.get("/");
      console.log("data", data);
      setUserData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <AppCtx.Provider
      value={{
        socket,
        gameData,
        userData,
      }}>
      {children}
    </AppCtx.Provider>
  );
};
