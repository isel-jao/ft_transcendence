import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber";
import Game from "../../components/Game";
import { AppCtx } from "../../context/socketContext";
import { useContext } from "react";
import { PointLightShadow } from "three";
const Home: NextPage = () => {
  const { socket, gameData } = useContext(AppCtx);
  return (
    <>
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bold",
          backgroundColor: "transparent",
          cursor: "pointer",
          zIndex: 999,
        }}
        // onClick={() => socket.emit("startGame")}
      >
        PLAY
      </div>
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bolder",
          backgroundColor: "transparent",
          cursor: "pointer",
          left: "50%",
          zIndex: 999,
        }}
      >
        {gameData.score.player1} - {gameData.score.player2}
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
            position: [-0.018223506966510716, -54, 20],
            near: 0.1,
            far: 1000,
          }}
        >
          <pointLight
            position={[0, 0, 20]}
            color={"white"}
            intensity={1}
            // angle={20}
            // distance={100}
          />
          <axesHelper args={[200, 200, 200]} />
          <ambientLight intensity={0.8} color={"white"} />
          <Game socket={socket} gameData={gameData} />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
