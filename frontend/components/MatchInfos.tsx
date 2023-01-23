import { useContext } from "react";
import Image from "next/image";
import { AppCtx } from "../context/socketContext";

const MatchInfos = ({ setHidden }: { setHidden: (v: boolean) => void }) => {
  const { socket, gameData, roomData, watchers } = useContext(AppCtx);

  return (
    <div>
      {roomData?.player1 == socket.id && roomData?.status == "pending" && (
        <div
          style={{
            color: "white",
            position: "absolute",
            fontWeight: "bold",
            backgroundColor: "transparent",
            cursor: "pointer",
            zIndex: 9,
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
      {/* @ts-ignore */}
      <div
        style={{
          color: "white",
          position: "absolute",
          fontWeight: "bolder",
          backgroundColor: "transparent",
          cursor: "pointer",
          left: "50%",
          zIndex: 1,
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
          left: "85%",
          zIndex: 9,
        }}
      >
        <div
          style={{ marginRight: "5px", fontWeight: 600, fontSize: "0.9rem" }}
        >
          {watchers?.length | 0}
        </div>
        <Image src={"/Icons/Eye.svg"} width={"17%"} height={"17%"} />
        <div
          style={{
            marginLeft: "10px",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
          onClick={() => setHidden(true)}
        >
          ?
        </div>
      </div>
    </div>
  );
};

export default MatchInfos;
