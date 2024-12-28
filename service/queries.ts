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
      query ($username: String!) {
        user(login: $username) {
          repositories(first: 100, ownerAffiliations: OWNER) {
            totalCount
            nodes {
              nameWithOwner
              isPrivate
              stargazerCount
              forkCount
            }
          }
          repositoriesContributedTo(
            first: 100,
            contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY]
            includeUserRepositories: false
          ) {
            totalCount
            nodes {
              nameWithOwner
              isPrivate
              stargazerCount
              forkCount
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
