import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script async defer data-website-id="b9620b9a-f791-4343-9805-f5779446aedf" src="https://umami.njf.dev/umami.js"></script>
      </Head>
      <body className='bg-neutral-100 dark:bg-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default  Document;