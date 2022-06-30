import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html lang='en'>
      <Head>
        <script async defer data-website-id="b9620b9a-f791-4343-9805-f5779446aedf" src="https://umami.njf.dev/umami.js" />
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ckksdl5jx1");
          `}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
