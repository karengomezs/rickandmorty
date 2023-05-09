import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className="space stars1"></div>
        <div className="space stars2"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
