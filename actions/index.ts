"use server";
import { signIn, signOut } from "@/auth";

export async function initSignIn() {
  await signIn("github");
}

export async function initSignOut() {
  await signOut();
}
