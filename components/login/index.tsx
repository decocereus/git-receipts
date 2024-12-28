import React from "react";
import { Button } from "../ui/button/button";
import { signIn } from "@/auth";

const LoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button>Signin with GitHub</Button>
    </form>
  );
};

export default LoginButton;
