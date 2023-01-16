import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "../../components/style/Home";
import Card from "../../components/CardGame";
import Router from "next/router";

const Div = styled.div`
  display: flex;
  padding: 80px;
  width: 100%;
  height: 50%;
  color: #ffff;
  align-items: center;
  .title {
    width: 100%;
    span {
      font-weight: bold;
      font-size: 3.2rem;
    }
    p {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .player {
    width: 100%;
  }
`;
const Main = styled.div`
  width: 100%;
  color: #fff;
  > div {
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
  }
  > .Cards {
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    display: flex;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }
`;
const Home: NextPage = () => {
  return (
    <div>
      <Div>
        <div className="title">
          <span>Win a Game</span>
          <p>Let’s start a game against your friend or a random people.</p>
          <Button
            type="submit"
            value="PLAY NOW"
            onClick={() => Router.push("/game")}
          />
        </div>
        <div className="player">
          <Image src="/icons/Player.svg" width={500} height={500} />
        </div>
      </Div>
      <Main>
        <div style={{ marginBottom: "20px" }}>Recent games</div>
        <div className="Cards">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Main>
    </div>
  );
};

export default Home;
