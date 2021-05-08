import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { userContext } from "../lib/userContext";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../lib/hooks";
import { widContext } from "../lib/widContext";
import { taskContext } from "../lib/taskContext";
import axios from "axios";

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
  const [tasks, setTasks] = useState([]);

  const workspaceProvider = useMemo(() => ({ workspace, setWorkspace }), [
    workspace,
    setWorkspace,
  ]);

  const tasksProvider = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks]);

  useEffect(() => {
    const init = async (user) => {
      const res = await axios.post("/api/get-workspaces", {
        email: user ? user.email : "",
      });
      const resData = res.data;

      if (resData) {
        setWorkspace(resData);
      }
    };
    const timer = setTimeout(() => {
      init(user);
    }, 1000);

    return () => clearTimeout(timer);
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
          <taskContext.Provider value={tasksProvider}>
            <Component {...pageProps} />
          </taskContext.Provider>
        </widContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default MyApp;
