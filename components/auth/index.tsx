import React from "react";
import { Button } from "../ui/button/button";
import { initSignIn, initSignOut } from "@/actions";

const AuthButton = ({ type = "signin" }: { type?: "signin" | "signout" }) => {
  const logoutAction = type === "signout";
  return (
    <form
      action={async () => {
        if (logoutAction) {
          await initSignOut();
          return;
        }
        await initSignIn();
      }}
    >
      <Button variant={logoutAction ? "ghost" : "link"}>
        {logoutAction ? "Logout" : "Place your order!"}
      </Button>
    </form>
  );
};

export default AuthButton;
