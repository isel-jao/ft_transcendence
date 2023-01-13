import { GameDataType, RoomDataType } from "./types";
export const intialValue: GameDataType = {
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
};

export const initialRoom: RoomDataType = {
  player1: "q",
  player2: "q",
  roomName: "q",
  status: "",
  winner: "",
  type: "easy",
};
