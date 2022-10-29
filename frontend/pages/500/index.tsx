import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { Button } from "@mui/material";
import Link from "next/link";

const NotFoundStyled = styled.div`
  .view {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 7rem);
    justify-content: center;
    align-items: center;
    .image {
      width: 50vw;
      height: 50vh;
    }
  }
`;

const NotFound: NextPage = () => {
  return (
    <NotFoundStyled>
      <Head>
        <title>Server Error</title>
        <meta name="ft_transcendence" content="404 not found" />
      </Head>
      <div className="  view">
        <Link href="/home">
          <Button variant="outlined" color="primary">
            Back to Home
          </Button>
        </Link>
        <Image width={500} height={500} src={"/images/404.png"} alt="404" />
      </div>
    </NotFoundStyled>
  );
};

export default NotFound;
