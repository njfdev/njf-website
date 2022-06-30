import { Html, Head, Main, NextScript } from 'next/document';
import { baseUrl } from 'lib/helpers';

function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script async defer data-website-id="50e05f5f-156a-447f-923a-97397d16e00a" src="https://umami.njf.dev/umami.js" />

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet"/>
      </Head>
      <body className='bg-neutral-100 dark:bg-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default  Document;
