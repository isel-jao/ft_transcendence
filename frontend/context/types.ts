export type Position = {
  x: Number;
  y: Number;
  z: Number;
};
export type GameDataType = {
  ball: Position;
  player1: Position;
  player2: Position;
  score: {
    player1: Number;
    player2: Number;
  };
};
export type userDataInterface = {
  id: number;
  username: string;
};
export type RoomDataType = {
  player1: string;
  player2: string;
  roomName: string;
  winner?: string;
  status: string;
  type: string;
};
