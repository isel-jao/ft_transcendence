import type { NextPage } from "next";
import { useState, useContext } from "react";
import Loading from "../../components/Loading";
import { Div, Container } from "../../components/style/Game";
import { AppCtx } from "../../context/socketContext";
import { Button } from "../../components/style/Home";
import Image from "next/image";
const Home: NextPage = () => {
  const [search, setSearch] = useState(false);
  const { socket } = useContext(AppCtx);
  return (
    <Container>
      <Div>
        <span>Let’s Play</span>
        <p>
          Pong is a sports game that simulates table tennis. The player controls
          an in-game paddle by moving it vertically across the left or right
          side of the screen. They can compete against another player
          controlling a second paddle on the opposing side.
        </p>
        <p>
          Players use the paddles to hit a ball back and forth. The goal is for
          each player to reach eleven points before the opponent; points are
          earned when one fails to return the ball to the other.
        </p>
        {!search ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              value="READY"
              onClick={() => {
                setSearch(!search);
                socket.emit("findGame");
              }}
            />
            <Image src={"/Icons/Keys.svg"} width={150} height={150} />
          </div>
        ) : (
          <Loading message="Finding a player ..." />
        )}
      </Div>
    </Container>
  );
};

export default Home;
