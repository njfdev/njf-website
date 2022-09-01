import Head from "next/head";
import style from "./index.module.css";
import { MD5 } from "crypto-js";

export async function getStaticProps(context) {
  const dateString = (new Date).toDateString();

  const date = (new Date).toLocaleDateString('en-us');
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  return {
    props: {
      dateString,
      hexColor
    },
  }
}

function Home({ dateString, hexColor }) {
  return (
    <>
      <Head>
        <title>Website In Development | njf</title>
        <meta name='description' content="This is the website of Nicholas Fasching. Please come back later because this website is still in development." />
      </Head>

      <h1>In Development - Come Back Later</h1>
      <p>
        Hello and welcome to the website of Nicholas Fasching that is currently in development. While you are waiting for this website to become active, look below ↓.
      </p>

      <h2>Color of the Day:</h2>
      <div id={style.colorDiv} style={{ backgroundColor: `#${hexColor}` }}>
        <div id={style.textOverlay}>
          <h3>{dateString}</h3>
          <p>Hex: #{hexColor.toUpperCase()}</p>
        </div>
      </div>
    </>
  )
}

export default Home;
