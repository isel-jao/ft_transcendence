import { Avatar } from "@mui/material";
import { Card, Cover, Details } from "./style/Home";
import Image from "next/image";

type dataType = {
  background?: string;
  player1?: {
    img?: string;
    score?: number;
  };
  player2?: {
    img?: string;
    score?: number;
  };
  watchers: number;
};

const cardGame = (data: dataType) => {
  return (
    <Card>
      <Cover src={data.background} />
      <Details>
        <div className="infos" style={{ fontSize: "12px" }}>
          <div>3 goals left</div>
          <div className="seen">
            <Image src="/icons/Watcher.svg" width={15} height={15} />
            <span style={{ marginLeft: "10px" }}>{data.watchers | 0}</span>
          </div>
        </div>
        <div className="result">
          <Avatar src={data.player1?.img} sx={{ width: 50, height: 50 }} />
          <div>
            {Number(data.player1?.score) | 0} -{" "}
            {Number(data.player2?.score) | 0}
          </div>
          <Avatar src={data.player2?.img} sx={{ width: 50, height: 50 }} />
        </div>
      </Details>
    </Card>
  );
};

export default cardGame;
