import React from "react";
import Form from "../components/form/Form";
import Router from "next/router";
import { useUser } from "../lib/hooks";

import { Magic } from "magic-sdk";

const Login = () => {
  useUser({ redirectTo: "/profile", redirectIfFound: true });

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
    };

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      });
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/profile");
        location.reload();
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="font-icon text-4xl font-semibold py-6">Co Creatr</h1>
        <div>
          <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
