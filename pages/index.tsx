import React from "react";
import { useUser } from "../lib/hooks";
import Link from "next/link";

const Home = () => {
  useUser({ redirectTo: "/profile", redirectIfFound: true });

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-icon text-4xl font-semibold py-3">Co Creatr</h1>
        <p className="mb-3 italic text-gray-300">
          If you were given a invite link, you will need to login first before
          accessing the workspace.
        </p>
        <div className="my-3">
          <Link href="/login">
            <a className="border-2 border-black hover:border-green-500 py-4 px-3 font-md tracking-wider hover:text-green-600">
              To Sign in Page
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
