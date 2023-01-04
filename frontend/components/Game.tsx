import React from "react";
import Ball from "./modules/Ball";
import Stage from "./modules/Stage";
import Padle from "./modules/Padle";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { usePersonControls, resize } from "../hooks/movement";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const PADDLE_SIZE = 40 / 5;
const Game = (props: any) => {
  const { camera, gl, scene }: any = useThree();
  const player = useRef<any>();
  const player2 = useRef<any>();
  const ball = useRef<any>();
  const cornerTop = useRef<any>();
  const cornerBottom = useRef<any>();
  const cornerLeft = useRef<any>();
  const cornerRight = useRef<any>();
  const { socket, gameData, roomData } = props;
  let { left, right } = usePersonControls();
  let size = resize();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  useEffect(() => {
    if (roomData.player2 == socket.id) scene.rotateZ(Math.PI);
  }, []);
  useEffect(() => {
    if (
      (left || right) &&
      (roomData.player1 == socket.id || roomData.player2 == socket.id)
    ) {
      socket.emit("paddleMove", {
        roomName: roomData.roomName,
        socketId: socket.id,
        left,
        right,
      });
    }
  }, [left, right]);
  useEffect(() => {
    if (size.width < 1000) camera.fov = 110;
    if (size.width > 1000) camera.fov = 100;
    if (size.width < 700) camera.fov = 150;
    camera.updateProjectionMatrix();
  }, [size]);
  useFrame(({ gl, scene, camera }) => {
    ball.current.position.copy(gameData.ball);
    player.current.position.copy(gameData.player1);
    player2.current.position.copy(gameData.player2);
    gl.render(scene, camera);
  }, 1);
  return (
    <>
      <Ball ref={ball} />
      <Stage
        ref={{
          refBottom: cornerBottom,
          refTop: cornerTop,
          refLeft: cornerLeft,
          refRight: cornerRight,
        }}
      />
      {/* Player 1 */}
      <Padle
        position={[0, -60 / 2 + 3, 0]}
        args={[1.5, 2, PADDLE_SIZE]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#C70039"
        name="player1"
        ref={player}
      />
      {/* Player 2 */}
      <Padle
        position={[0, 60 / 2 - 3, 0]}
        args={[1.5, 2, PADDLE_SIZE]}
        rotateX={Math.PI / 2}
        rotateY={Math.PI / 2}
        color="#00FF00"
        name="player2"
        ref={player2}
      />
    </>
  );
};

export default Game;
