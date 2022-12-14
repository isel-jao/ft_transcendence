import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import Game from "../../components/Game";
import { AppCtx } from "../../context/socketContext";
import { useContext, useEffect } from "react";
import Overlay from "../../components/Overlay";
import Router from "next/router";
import Image from "next/image";

// import { PointLightShadow } from "three";

const Home = () => {
  const { socket, gameData, roomData } = useContext(AppCtx);
  useEffect(() => {
    if (roomData?.roomName === "") Router.push("/game/");
    else
      socket.emit("joinToRoom", {
        roomName: roomData.roomName,
      });
    // console.log(roomData);
  }, []);
  return (
    <>
      {roomData?.status == "gameOver" && (
        <Overlay
          data={roomData.winner === socket.id ? true : false}
          isAdmin={roomData.player1 == socket.id}
          onClick={() =>
            socket.emit("startGame", {
              roomName: roomData.roomName,
            })
          }
        />
      )}
      {roomData?.player1 == socket.id && roomData?.status == "pending" && (
        <div
          style={{
            color: "white",
            position: "absolute",
            fontWeight: "bold",
            backgroundColor: "transparent",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() =>
            socket.emit("startGame", {
              roomName: roomData.roomName,
            })
          }
        >
          PLAY
        </div>
      )}
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bolder",
          backgroundColor: "transparent",
          cursor: "pointer",
          left: "50%",
          zIndex: 10,
        }}
      >
        {gameData.score.player1} - {gameData.score.player2}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          right: "5px",
        }}
      >
        <div
          style={{ marginRight: "5px", fontWeight: 600, fontSize: "0.9rem" }}
        >
          {roomData.watchers?.length | 0}
        </div>
        <Image src={"/Icons/Eye.svg"} width={"17%"} height={"17%"} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas
          shadows={true}
          camera={{
            fov: 75,
            position: [-0.018223506966510716, -54, 20], //player 1 position
            // position: [0, 0, 51], //Specter possition
            // position: [4.0776531936721225, 72.17340230306262, 1], // player 2 position
            near: 0.1,
            far: 1000,
          }}
        >
          <pointLight
            position={[0, 0, 20]}
            color={"white"}
            intensity={0.7}
            distance={100}
          />
          <axesHelper args={[200, 200, 200]} />
          {/* <ambientLight intensity={0.8} color={"white"} /> */}
          <Game socket={socket} gameData={gameData} roomData={roomData} />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
