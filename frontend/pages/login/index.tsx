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
  background-image: linear-gradient(
    to right top,
    #000000,
    #2f011d,
    #4e0044,
    #59007e,
    #1e0bc8
  );
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Wrapper = styled.div`
  display: flex;
  margin-left: 150px;
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
  }
`;
const NextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  a {
    align-self: center;
  }
  h3 {
    color: black;
  }
`;
const LottieStyle = {
  width: "500px",
  height: "500px",
  alignSelf: "flex-end",
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
          Le principal objectif de ce site web est de jouer à Pong avec d’autres
          joueurs et de montrer à tout le monde votre talent !
        </p>
        <NextWrapper>
          <a href={`http://localhost:3001/auth/login`}>
            <ButtonUi>
              <svg
                width="50"
                height="25"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 9.41998L19.572 13.835H24V9.41998ZM19.572 5.00297L15.158 9.42097V13.835H19.572V9.41998L24 5.00297V0.574975H19.572V5.00297ZM15.158 5.00297L19.572 0.574975H15.158V5.00297ZM0 12.996H8.842V17.426H13.254V9.41998H4.428L13.254 0.573975H8.842L0 9.42097V12.996Z"
                  fill="black"
                />
              </svg>
              <h3>Intra</h3>
            </ButtonUi>
          </a>
          <Lottie
            animationData={PingPongJson}
            loop={true}
            style={LottieStyle}
          />
        </NextWrapper>
      </Wrapper>
    </Container>
  );
}
