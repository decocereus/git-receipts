/* eslint-disable @typescript-eslint/no-explicit-any */
import { GitHubStats } from "@/service/response";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateFilter(timeframe: "year" | "lifetime"): string | null {
  if (timeframe === "year") {
    const date = new Date(1735689600000);
    return date.toISOString();
  }
  return null;
}

export function generateReceiptNumber() {
  return Math.floor(Math.random() * 10000);
}

export function formatDateFull(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function getDayOfWeek(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

export function getTime(): string {
  const date = new Date();
  return date.toLocaleTimeString("en-US", { hour12: true });
}

export const SAMPLE_STATS: GitHubStats = {
  user: {
    login: "johndoe",
    id: 123456,
    node_id: "MDQ6VXNlcjEyMzQ1Ng==",
    avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/johndoe",
    html_url: "https://github.com/johndoe",
    followers_url: "https://api.github.com/users/johndoe/followers",
    following_url:
      "https://api.github.com/users/johndoe/following{/other_user}",
    gists_url: "https://api.github.com/users/johndoe/gists{/gist_id}",
    starred_url: "https://api.github.com/users/johndoe/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/johndoe/subscriptions",
    organizations_url: "https://api.github.com/users/johndoe/orgs",
    repos_url: "https://api.github.com/users/johndoe/repos",
    events_url: "https://api.github.com/users/johndoe/events{/privacy}",
    received_events_url: "https://api.github.com/users/johndoe/received_events",
    type: "User",
    site_admin: false,
    name: "John Doe",
    company: "Example Corp",
    blog: "https://johndoe.com",
    location: "San Francisco, CA",
    email: "johndoe@example.com",
    hireable: true,
    bio: "Software Developer",
    twitter_username: "johndoe",
    public_repos: 10,
    public_gists: 5,
    followers: 100,
    following: 50,
    created_at: "2015-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    private_gists: 2,
    total_private_repos: 5,
    owned_private_repos: 3,
    disk_usage: 12345,
    collaborators: 0,
    plan: {
      collaborators: 5,
      name: "Pro",
      space: 976562500,
      private_repos: 100,
    },
  },
  totalCommits: {
    total: 150,
    private: 50,
    public: 100,
  },
  pullRequests: {
    total: 20,
    private: 5,
    public: 15,
    details: {},
  },
  repositories: {
    created: {
      total: 10,
      private: 3,
      public: 7,
    },
    contributed: {
      total: 5,
      private: 1,
      public: 4,
    },
    details: {},
  },
  topLanguages: [
    { name: "JavaScript", color: "#f1e05a", size: 5000, percentage: 50 },
    { name: "TypeScript", color: "#2b7489", size: 3000, percentage: 30 },
  ],
  contributions: {
    totalContributions: 200,
    mostProductiveDay: {
      date: "2023-01-01",
      count: 10,
    },
    mostActiveWeekday: {
      day: 1, // Monday
      totalContributions: 50,
    },
  },
};
