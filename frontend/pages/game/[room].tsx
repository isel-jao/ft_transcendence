import { Canvas } from "@react-three/fiber";
import Game from "../../components/Game";
import { AppCtx } from "../../context/socketContext";
import { useContext, useEffect, useState } from "react";
import Overlay from "../../components/Overlay";
import { useRouter } from "next/router";

import { useResize } from "../../hooks/movement";
import MatchInfos from "../../components/MatchInfos";
import HowToPlay from "../../components/HowToPlay";
// import { PointLightShadow } from "three";

const Home = () => {
  const router = useRouter();
  const { room } = router.query;
  const { socket, gameData, roomData } = useContext(AppCtx);
  const [sym, setSym] = useState(false);
  const [hidden, setHidden] = useState(false);
  let size = useResize();

  useEffect(() => {
    if (room)
      socket.emit("joinToRoom", {
        roomName: room,
      });
  }, [room]);
  useEffect(() => {
    if (roomData.roomName != "") setSym(true);
  }, [roomData.roomName]);
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {roomData?.status == "gameOver" && (
        <Overlay
          data={roomData.winner === socket.id ? true : false}
          isAdmin={roomData.player1 == socket.id}
          hidden={
            roomData.player1 == socket.id || roomData.player2 == socket.id
              ? true
              : false
          }
          onClick={() =>
            socket.emit("startGame", {
              roomName: roomData.roomName,
            })
          }
        />
      )}
      <MatchInfos setHidden={setHidden} />
      <HowToPlay hidden={hidden} setHidden={setHidden} />
      {sym && (
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
            {/* @ts-ignore */}
            <axesHelper args={[200, 200, 200]} />
            {/* <ambientLight intensity={0.8} color={"white"} /> */}
            <Game
              socket={socket}
              gameData={gameData}
              roomData={roomData}
              size={size}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Home;
