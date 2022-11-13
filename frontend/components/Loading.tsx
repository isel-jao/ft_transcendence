import type { NextPage } from "next";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";

const Span = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
`;
const Loading: NextPage = ({ message }: string) => {
  return (
    <Span>
      <Player
        autoplay
        style={{ width: "30%" }}
        speed={1}
        loop
        src="/loading.json"
      ></Player>
      <span>{message}</span>
    </Span>
  );
};

export default Loading;
