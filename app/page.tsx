import { auth } from "@/auth";
import GithubService from "@/service";
import {
  formatDateFull,
  generateReceiptNumber,
  getTime,
  SAMPLE_STATS,
} from "@/lib/utils";
import GitHubWrapped from "@/components/top-section";
import dynamic from "next/dynamic";
const GitHubReceiptAnimated = dynamic(
  () => import("@/components/git-recipt/with-animation")
);

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.accessToken;
  const stats = await GithubService.fetchGitHubStats("year");
  const receiptGeneratedOn = formatDateFull(new Date());
  const orderNumber = generateReceiptNumber();
  const servedAt = getTime();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <GitHubWrapped />
      <div className="max-w-7xl mx-auto">
        {!session ? (
          <div className="flex flex-col items-center justify-center">
            <GitHubReceiptAnimated
              stats={SAMPLE_STATS}
              isLoggedIn={isLoggedIn}
              receiptGeneratedOn={receiptGeneratedOn}
              orderNumber={orderNumber}
              servedAt={servedAt}
            />
          </div>
        ) : (
          <>
            {stats && (
              <GitHubReceiptAnimated
                stats={stats}
                isLoggedIn={isLoggedIn}
                receiptGeneratedOn={receiptGeneratedOn}
                orderNumber={orderNumber}
                servedAt={servedAt}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
