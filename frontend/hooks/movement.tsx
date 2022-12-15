import { useEffect, useState, useContext } from "react";
import { AppCtx } from "../context/socketContext";

export const usePersonControls = () => {
  const { roomData, socket } = useContext(AppCtx);
  if (roomData.player1 == socket.id || roomData.player1 == socket.id) {
    const keys = {
      ArrowRight: "right",
      ArrowLeft: "left",
    };

    const moveFieldByKey = (key: string) => keys[key];

    const [movement, setMovement] = useState({
      left: false,
      right: false,
    });

    useEffect(() => {
      const handleKeyDown = (e) => {
        console.log(e.code);
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
      };
      const handleKeyUp = (e) => {
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
      };
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return movement;
  }
};

export const resize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
};
