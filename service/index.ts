/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDateFilter } from "@/lib/utils";
import { Octokit } from "@octokit/rest";
import { ContributionDay, GitHubStats, LanguageStats } from "./response";
import { auth } from "@/auth";
import {
  contributionStatsQuery,
  getCommitCountQuery,
  getRepositoryStatsQuery,
  topLanguagesQuery,
} from "./queries";

class GithubService {
  public static async getCommitCount(
    octokit: Octokit,
    username: string,
    since: string,
  ): Promise<{ total: number; private: number; public: number }> {
    const result = await octokit.graphql(getCommitCountQuery, {
      username,
      since,
    });

    const data = result as any;
    const contributions = data.user.contributionsCollection;
    const privateCommits = contributions.commitContributionsByRepository
      .filter((repo: any) => repo.repository.isPrivate)
      .reduce(
        (acc: number, curr: any) => acc + curr.contributions.totalCount,
        0,
      );

    const publicCommits = contributions.commitContributionsByRepository
      .filter((repo: any) => !repo.repository.isPrivate)
      .reduce(
        (acc: number, curr: any) => acc + curr.contributions.totalCount,
        0,
      );
    const total =
      contributions.totalCommitContributions +
      contributions.restrictedContributionsCount;

    console.log("Commit Statistics:", {
      total,
      private: privateCommits,
      public: publicCommits,
      restrictedCount: contributions.restrictedContributionsCount,
      byRepository: contributions.commitContributionsByRepository.map(
        (repo: any) => ({
          repo: repo.repository.nameWithOwner,
          isPrivate: repo.repository.isPrivate,
          commits: repo.contributions.totalCount,
        }),
      ),
    });

    return {
      total,
      private: privateCommits,
      public: publicCommits,
    };
  }

  public static async getPullRequestCount(
    octokit: Octokit,
    username: string,
    since: string,
  ): Promise<{ total: number; private: number; public: number; details: any }> {
    const searchQuery = `author:${username} is:pr created:>${since}`;

    const getPullRequestCountQuery = `
      query ($username: String!) {
        search(query: "${searchQuery}", type: ISSUE, first: 100) {
          nodes {
            ... on PullRequest {
              title
              repository {
                nameWithOwner
                isPrivate
              }
              state
              createdAt
            }
          }
          issueCount
        }
        user(login: $username) {
          pullRequests(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            nodes {
              repository {
                isPrivate
                nameWithOwner
              }
              state
              createdAt
            }
          }
        }
      }
    `;

    const result = await octokit.graphql(getPullRequestCountQuery, {
      username,
    });

    const data = result as any;
    const prs = data.search.nodes;

    const privatePRs = prs.filter((pr: any) => pr.repository.isPrivate).length;
    const publicPRs = prs.filter((pr: any) => !pr.repository.isPrivate).length;

    const details = {
      byRepository: prs.reduce((acc: any, pr: any) => {
        const repoName = pr.repository.nameWithOwner;
        if (!acc[repoName]) {
          acc[repoName] = {
            isPrivate: pr.repository.isPrivate,
            count: 0,
            states: {},
          };
        }
        acc[repoName].count++;
        acc[repoName].states[pr.state] =
          (acc[repoName].states[pr.state] || 0) + 1;
        return acc;
      }, {}),
      byState: prs.reduce((acc: any, pr: any) => {
        acc[pr.state] = (acc[pr.state] || 0) + 1;
        return acc;
      }, {}),
    };

    console.log("PRs", {
      total: data.search.issueCount,
      private: privatePRs,
      public: publicPRs,
      details,
    });

    return {
      total: data.search.issueCount,
      private: privatePRs,
      public: publicPRs,
      details,
    };
  }

  public static async getRepositoryStats(
    octokit: Octokit,
    username: string,
  ): Promise<{
    created: { total: number; private: number; public: number };
    contributed: { total: number; private: number; public: number };
    details: any;
  }> {
    const result = await octokit.graphql(getRepositoryStatsQuery, { username });
    const data = result as any;

    const ownedRepos = data.user.repositories.nodes;
    const contributedRepos = data.user.repositoriesContributedTo.nodes;

    const created = {
      total: data.user.repositories.totalCount,
      private: ownedRepos.filter((repo: any) => repo.isPrivate).length,
      public: ownedRepos.filter((repo: any) => !repo.isPrivate).length,
    };

    const contributed = {
      total: data.user.repositoriesContributedTo.totalCount,
      private: contributedRepos.filter((repo: any) => repo.isPrivate).length,
      public: contributedRepos.filter((repo: any) => !repo.isPrivate).length,
    };

    const details = {
      created: {
        repositories: ownedRepos.map((repo: any) => ({
          name: repo.nameWithOwner,
          isPrivate: repo.isPrivate,
          stars: repo.stargazerCount,
          forks: repo.forkCount,
        })),
      },
      contributed: {
        repositories: contributedRepos.map((repo: any) => ({
          name: repo.nameWithOwner,
          isPrivate: repo.isPrivate,
          stars: repo.stargazerCount,
          forks: repo.forkCount,
        })),
      },
    };

    console.log("Repository Statistics:", { created, contributed, details });

    return { created, contributed, details };
  }

  public static async getContributionStats(
    octokit: Octokit,
    username: string,
    since: string,
  ) {
    const result: any = await octokit.graphql(contributionStatsQuery, {
      username,
      from: since,
    });

    const days =
      result.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week: any) => week.contributionDays,
      );
    const maxContributionDay = days.reduce(
      (max: ContributionDay, day: ContributionDay) =>
        day.contributionCount > max.contributionCount ? day : max,
      days[0],
    );
    const contributionsByDay = days.reduce(
      (acc: Record<number, number>, day: ContributionDay) => {
        acc[day.weekday] = (acc[day.weekday] || 0) + day.contributionCount;
        return acc;
      },
      {},
    );

    const mostActiveDay = Object.entries(contributionsByDay).reduce(
      (max, [day, count]) =>
        (count as number) > (max[1] as number) ? [day, count] : max,
      ["0", 0],
    );

    console.log("Contribution Stats", {
      totalContributions:
        result.user.contributionsCollection.contributionCalendar
          .totalContributions,
      mostProductiveDay: {
        date: maxContributionDay.date,
        count: maxContributionDay.contributionCount,
      },
      mostActiveWeekday: {
        day: Number(mostActiveDay[0]),
        totalContributions: mostActiveDay[1],
      },
    });

    return {
      totalContributions:
        result.user.contributionsCollection.contributionCalendar
          .totalContributions,
      mostProductiveDay: {
        date: maxContributionDay.date,
        count: maxContributionDay.contributionCount,
      },
      mostActiveWeekday: {
        day: Number(mostActiveDay[0]),
        totalContributions: mostActiveDay[1],
      },
    };
  }

  public static async getTopLanguages(
    octokit: Octokit,
    username: string,
  ): Promise<LanguageStats[]> {
    const result: any = await octokit.graphql(topLanguagesQuery, {
      username,
      first: 10,
    });

    const languages = new Map<string, { color: string; size: number }>();
    let totalSize = 0;
    result.user.repositories.nodes.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const { name, color } = edge.node;
        const size = edge.size;

        if (languages.has(name)) {
          languages.get(name)!.size += size;
        } else {
          languages.set(name, { color, size });
        }
        totalSize += size;
      });
    });

    const formattedTopLanguages = Array.from(languages.entries())
      .map(([name, { color, size }]) => ({
        name,
        color,
        size,
        percentage: (size / totalSize) * 100,
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    console.log("Top Languages", formattedTopLanguages);
    return formattedTopLanguages;
  }

  public static async fetchGitHubStats(
    timeframe: "year" | "lifetime" = "year",
  ): Promise<GitHubStats | undefined> {
    const session = await auth();
    if (!session?.accessToken) return undefined;

    const octokit = new Octokit({
      auth: session?.accessToken,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
    });

    const { data: user } = await octokit.users.getAuthenticated();
    console.log("user", user);

    const adjustedTimeframe =
      timeframe === "year"
        ? (getDateFilter(timeframe) ?? "2025-01-01")
        : user?.created_at;

    const stats = await Promise.all([
      GithubService.getCommitCount(octokit, user.login, adjustedTimeframe),
      GithubService.getPullRequestCount(octokit, user.login, adjustedTimeframe),
      GithubService.getRepositoryStats(octokit, user.login),
      GithubService.getTopLanguages(octokit, user.login),
      GithubService.getContributionStats(
        octokit,
        user.login,
        adjustedTimeframe,
      ),
    ]);
    return {
      user: user as any,
      totalCommits: stats[0],
      pullRequests: stats[1],
      repositories: stats[2],
      topLanguages: stats[3],
      contributions: stats[4],
    };
  }
}

export default GithubService;
