import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { intialValue, initialRoom } from "./helpers";
import { GameDataType, userDataInterface, RoomDataType } from "./types";
import { changeRoute } from "../hooks/changeRoute";
import axios from "axios";
import BasicModal from "../components/Modal/Modal";
import { useCookies } from "react-cookie";

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

let socket: Socket = io("http://localhost:3001");

let tmpRoom: RoomDataType = initialRoom;
export const SocketContext = ({ children }: any) => {
  const [cookies] = useCookies(["access_token"]);
  useEffect(() => {
    if (cookies.access_token)
      socket = io("http://localhost:3001", {
        query: {
          token: cookies.access_token,
        },
      });
  }, [cookies.access_token]);
  const [userData, setUserData] = useState<userDataInterface | null>(null);
  const [roomData, setRoom] = useState<RoomDataType>(initialRoom);
  const [watchers, setWatchers] = useState<[string?]>([]);
  const [gameData, setData] = useState<GameDataType>(intialValue);
  const [changed, init] = changeRoute();

  useEffect(() => {
    if (changed && roomData.roomName)
      socket.emit("leftRoom", { roomName: roomData.roomName });
    return () => {
      if (typeof init === "function") init();
    };
  }, [changed]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("/");
        setUserData(res.data);
      } catch (e) {}
    };
    getUserData();
  }, []);
  useEffect(() => {
    socket.on("watcher", (data) => {
      const { socketId, type, roomName, watchersRoom } = data;
      if (type != "LEAVE") {
        console.log("SALAM", watchersRoom);
        if (socketId === socket.id) setRoom({ ...roomData, roomName });
        // @ts-ignore
        setWatchers([...watchersRoom]);
      } else {
        console.log("leave", watchersRoom);
        // @ts-ignore
        setWatchers([...watchersRoom]);
      }
    });
    socket.on("error", () => {
      Router.push("/game/");
    });
    socket.on("joinRoom", (data: RoomDataType) => {
      setData(intialValue);
      console.log("data in join room", data);
      setRoom(data);
      tmpRoom = data;
      Router.push("/game/" + data.roomName);
      console.log("JOINROOM", data);
    });

    socket.on("leftGame", (data) => {
      console.log("inside LEFT GAME", tmpRoom);
      setRoom({
        ...roomData,
        status: data.status,
        winner: data.player1 != "" ? roomData.player1 : roomData.player2,
      });
    });
    socket.on("gameOver", (data) => {
      const { status, player1, player2 } = data;
      console.log("GameOVER", roomData);
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
    return () => {
      socket.off("watcher");
      socket.off("error");
      socket.off("joinRoom");
      socket.off("leftGame");
      socket.off("gameOver");
    };
  }, [roomData]);

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
      {userData?.isFistSignIn ? (
        <BasicModal
          userName={userData.userName}
          imageUrl={userData.imageUrl}
          id={userData.id}
        />
      ) : (
        children
      )}
    </AppCtx.Provider>
  );
};
