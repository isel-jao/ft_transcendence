import type { NextPage } from "next";
import Head from "next/head";
import { Button } from "@mui/material";
import Counter from "../../features/counter/Counter";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>home</title>
        <meta name="ft_transcendence" content="ft_transcendence" />
      </Head>
      <main>
        <Counter />
      </main>
      <Button>test</Button>
    </div>
  );
};

export default Home;
