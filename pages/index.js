import Head from "next/head";
import style from "./index.module.css";
import { MD5 } from "crypto-js";
import { GetColorName } from "hex-color-to-color-name";

export async function getStaticProps(context) {
  const dateString = (new Date).toDateString();

  const date = (new Date).toLocaleDateString('en-us');
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  const colorName = GetColorName(hexColor);

  return {
    props: {
      dateString,
      hexColor,
      colorName,
    },
    // Refresh webpage cache every hour
    revalidate: 60 * 60,
  }
}

function Home({ dateString, hexColor, colorName }) {
  return (
    <>
      <Head>
        <title>Website In Development | njf</title>
        <meta name='description' content="This is the website of Nicholas Fasching. Please come back later because this website is still in development." />
      </Head>

      <h1>Nicholas Fasching</h1>
      <p>
        Hello and welcome to the website of Nicholas Fasching. There is not much to see here, but you can look at the color of the day below. I recommend heading on over to my <a style={{ color: "white", fontWeight: "bold" }} href="https://blog.njf.dev">blog</a>.
      </p>

      <h2>Color of the Day:</h2>
      <div id={style.colorDiv} style={{ backgroundColor: `#${hexColor}` }}>
        <div id={style.textOverlay}>
          <h3>{dateString}</h3>
          <p>
            <b>{colorName}</b>
            <br />
            #{hexColor}
          </p>
        </div>
      </div>
    </>
  )
}

export default Home;
