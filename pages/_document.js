import { Html, Head, Main, NextScript } from 'next/document';
import { baseUrl } from 'lib/helpers';

function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script async defer data-website-id="50e05f5f-156a-447f-923a-97397d16e00a" src="https://umami.njf.dev/umami.js" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <body className='bg-neutral-100 dark:bg-neutral-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default  Document;
