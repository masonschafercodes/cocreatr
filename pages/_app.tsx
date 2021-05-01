import "tailwindcss/tailwind.css";

import "../styles/globals.css";

import Head from "next/head";
import { AppProps } from "next/app";

import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 2,
  color: "#34D399",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>CoCreatr - Work Better.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
