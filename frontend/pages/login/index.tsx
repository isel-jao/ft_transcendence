import React from "react";
import styled from "styled-components";
import Head from "next/head";
//LottieAnimation
import Lottie from "lottie-react";
import PingPongJson from "./ping-pong.json";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#171221 10%, #171328 80.61%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  max-width: 1427px;
  padding: 50px;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  h1 {
    color: white;
    font-size: 7rem;
    font-weight: 600;
  }
  p {
    color: white;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;
const NextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    color: black;
  }
`;
const LottieStyle = {
  width: "20%",
  alignSelf: "center",
};

const ButtonUi = styled.button`
  width: 220px;
  height: 60px;
  border-radius: 8px;
  background: #f5f5f5;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
  cursor: pointer;
`;
export default function Login() {
  return (
    <Container>
      <Head>
        <title>LoginPage</title>
        <meta name="ft_transcendence" content="ft_transcendence" />
      </Head>
      <Wrapper>
        <h1>Transcendence</h1>
        <p>
          Pong is one of the first computer games that ever created, this simple
          "tennis like" game features two paddles and a ball, the goal is to
          defeat your opponent by being the first one to gain10 point, a player
          gets a point once the opponent misses a ball. The game can be played
          with two human players, or one player against a computer controlled
          paddle.
        </p>
        <NextWrapper>
          <a href={`http://localhost:3001/auth/login`}>
            <ButtonUi>
              <svg
                width="50"
                height="25"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 9.41998L19.572 13.835H24V9.41998ZM19.572 5.00297L15.158 9.42097V13.835H19.572V9.41998L24 5.00297V0.574975H19.572V5.00297ZM15.158 5.00297L19.572 0.574975H15.158V5.00297ZM0 12.996H8.842V17.426H13.254V9.41998H4.428L13.254 0.573975H8.842L0 9.42097V12.996Z"
                  fill="black"
                />
              </svg>
              <h3>Intra</h3>
            </ButtonUi>
          </a>
          <Lottie animationData={PingPongJson} loop style={LottieStyle} />
        </NextWrapper>
      </Wrapper>
    </Container>
  );
}
