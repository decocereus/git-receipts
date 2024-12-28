import LoginButton from "@/components/login";
import { auth } from "@/auth";
import GithubService from "@/service";
import GitHubReceipt from "@/components/git-recipt/github-receipt";

export default async function Home() {
  const session = await auth();
  const stats = await GithubService.fetchGitHubStats("year");
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {!session ? (
          <div className="flex items-center justify-center h-[80vh]">
            <LoginButton />
          </div>
        ) : (
          <>{stats && <GitHubReceipt stats={stats} />}</>
        )}
      </div>
    </div>
  );
}
