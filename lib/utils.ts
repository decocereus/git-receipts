/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateFilter(timeframe: "year" | "lifetime"): string | null {
  if (timeframe === "year") {
    const date = new Date(1704067200000);
    return date.toISOString();
  }
  return null;
}

export function generateReceiptNumber() {
  return Math.floor(Math.random() * 10000);
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}
