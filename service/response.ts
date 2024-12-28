/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GitHubStats {
  user?: GithubUser;
  totalCommits: { total: number; private: number; public: number };
  pullRequests: {
    total: number;
    private: number;
    public: number;
    details: any;
  };
  repositories: {
    created: {
      total: number;
      private: number;
      public: number;
    };
    contributed: {
      total: number;
      private: number;
      public: number;
    };
    details: any;
  };
  topLanguages: LanguageStats[];
  contributions: {
    totalContributions: any;
    mostProductiveDay: {
      date: any;
      count: any;
    };
    mostActiveWeekday: {
      day: number;
      totalContributions: unknown;
    };
  };
}

export interface GithubUser {
  login: any;
  id: any;
  node_id: any;
  avatar_url: any;
  gravatar_id: any;
  url: any;
  html_url: any;
  followers_url: any;
  following_url: any;
  gists_url: any;
  starred_url: any;
  subscriptions_url: any;
  organizations_url: any;
  repos_url: any;
  events_url: any;
  received_events_url: any;
  type: any;
  site_admin: boolean;
  name: any;
  company: any;
  blog: any;
  location: any;
  email: any;
  hireable: any;
  bio: any;
  twitter_username?: any;
  // two_factor_authentication: any;
  public_repos: any;
  public_gists: any;
  followers: any;
  following: any;
  created_at: any;
  updated_at: any;
  private_gists?: any;
  total_private_repos: any;
  owned_private_repos: any;
  disk_usage: any;
  collaborators: any;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

export interface LanguageStats {
  name: string;
  color: string;
  size: number;
  percentage: number;
}

export interface PullRequestStats {
  total: number;
  private: number;
  public: number;
  organizational: number;
  details: {
    byRepository: Record<
      string,
      {
        isPrivate: boolean;
        isOrganizational: boolean;
        count: number;
        states: Record<string, number>;
      }
    >;
    byState: Record<string, number>;
  };
}
