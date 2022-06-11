import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang='en'>
      <Head>
      </Head>
      <body className='bg-neutral-100 dark:bg-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default  Document;