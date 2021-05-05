import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { userContext } from "../lib/userContext";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../lib/hooks";
import { widContext } from "../lib/widContext";

const progress = new ProgressBar({
  size: 2,
  color: "#34D399",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const user = useUser({ redirectTo: "/" });
  const [workspace, setWorkspace] = useState();

  const workspaceProvider = useMemo(() => ({ workspace, setWorkspace }), [
    workspace,
    setWorkspace,
  ]);

  useEffect(() => {
    async function init(data) {
      await fetch("/api/get-workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data ? { email: data.email } : { email: "" }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setWorkspace(data);
        })
        .catch((err) => console.error(err));
    }
    init(user);
  }, [user]);

  return (
    <div>
      <Head>
        <title>CoCreatr - Tasks Done Better.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <userContext.Provider value={user}>
        <widContext.Provider value={workspaceProvider}>
          <Component {...pageProps} />
        </widContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default MyApp;
