export const getCommitCountQuery = `
      query ($username: String!, $since: DateTime) {
        user(login: $username) {
          contributionsCollection(from: $since) {
            totalCommitContributions
            restrictedContributionsCount
            commitContributionsByRepository {
              repository {
                isPrivate
                nameWithOwner
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `;

export const getRepositoryStatsQuery = `
  query GetRepositoryStats($username: String!) {
    user(login: $username) {
      # All repositories (both private and public)
      repositories(
        first: 100, 
        ownerAffiliations: [OWNER]
      ) {
        totalCount
        nodes {
          nameWithOwner
          isPrivate
        }
      }
      # Contributed repositories (including org)
      repositoriesContributedTo(
        first: 100,
        contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY],
        includeUserRepositories: false
      ) {
        totalCount
        nodes {
          nameWithOwner
          isPrivate
          owner {
            ... on Organization {
              login
            }
          }
        }
      }
      # Organization memberships
      organizations(first: 100) {
        nodes {
          login
        }
      }
    }
  }
`;

export const contributionStatsQuery = `
  query($username: String!, $from: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export const topLanguagesQuery = `
  query($username: String!, $first: Int = 10) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], isFork: false) {
        nodes {
          name
          languages(first: $first, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                color
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const userPullRequestsQuery = `
  query GetUserPullRequests($username: String!, $since: String!, $cursor: String) {
    search(
      query: "author:$username is:pr created:>$since"
      type: ISSUE
      first: 100
      after: $cursor
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ... on PullRequest {
          title
          repository {
            nameWithOwner
            isPrivate
            owner {
              login
              ... on Organization {
                login
              }
            }
          }
          state
          createdAt
        }
      }
      issueCount
    }
  }
`;

export const orgPullRequestsQuery = `
  query GetOrgPullRequests($username: String!, $orgLogin: String!, $cursor: String) {
    organization(login: $orgLogin) {
      repositories(first: 100, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          nameWithOwner
          isPrivate
          pullRequests(
            first: 25,
            orderBy: {field: CREATED_AT, direction: DESC},
            authors: [$username]
          ) {
            nodes {
              title
              state
              createdAt
              repository {
                nameWithOwner
                isPrivate
                owner {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;
