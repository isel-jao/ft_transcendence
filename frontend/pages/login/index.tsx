import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "@mui/material";
const StyledDiv = styled.div`
  height: 100vh;
  background: linear-gradient(
    225deg,
    #430bc8 0%,
    #59007e 18.73%,
    #4e0044 47.1%,
    #2f011d 70.58%,
    #ab6690 100%
  );
  color: white;

  .description {
    position: absolute;
    left: 10%;
    top: 20%;
    right: 10%;
    .title {
      font-size: 4rem;
      font-weight: 600;
      margin-bottom: 3rem;
    }
    .sub-title {
      font-size: 2rem;
      max-width: 60rem;
      margin-bottom: 3rem;
    }
  }
`;

const LoginPage: NextPage = () => {
  return (
    <StyledDiv>
      <Head>
        <title>LoginPage</title>
        <meta name="ft_transcendence" content="ft_transcendence" />
      </Head>
      <main className="">
        <a href={`http://localhost:3001/auth/login`}>
          <Button variant="outlined">login</Button>
        </a>
        <div className="description ">
          <div className="title">Transcendence</div>
          <div className="sub-title ">
            Le principal objectif de ce site web est de jouer à Pong avec
            d’autres joueurs et de montrer à tout le monde votre talent !
          </div>
          <div className="flex justify-end pr-6">
            <Image width={400} height={200} src="/images/pong.svg" alt="pong" />
          </div>
        </div>
      </main>
    </StyledDiv>
  );
};

export default LoginPage;
