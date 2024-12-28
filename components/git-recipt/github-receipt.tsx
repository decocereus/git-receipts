import { Card } from "@/components/ui/card";
import {
  formatDateFull,
  generateReceiptNumber,
  getDayOfWeek,
} from "@/lib/utils";
import { GitHubStats } from "@/service/response";

export default function GitHubReceipt({
  stats,
}: Readonly<{ stats?: GitHubStats }>) {
  const receiptGeneratedOn = formatDateFull(new Date().toLocaleDateString());
  const topLang = "";
  const topLanguages = stats?.topLanguages
    ?.slice(0, 3)
    .reduce((acc, curr) => acc + `${curr?.name}_`, topLang);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white p-8 font-mono text-sm space-y-6 rounded-sm">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold">GITHUB RECEIPT</h1>
          <p>{receiptGeneratedOn}</p>
          <p>ORDER #{generateReceiptNumber()}</p>
          <p className="text-xs">(2024 in review)</p>
        </div>

        <div className="border-t border-b border-dashed py-4 space-y-2">
          <p>CUSTOMER: {stats?.user?.name}</p>
          <p>@{stats?.user?.login}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>REPOSITORIES</span>
            <span>{stats?.user?.public_repos}</span>
          </div>
          <div className="flex justify-between">
            <span>COMMITS</span>
            <span>{stats?.totalCommits?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>PULL REQUESTS</span>
            <span>{stats?.pullRequests?.total}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWERS</span>
            <span>{stats?.user?.followers}</span>
          </div>
          <div className="flex justify-between">
            <span>FOLLOWING</span>
            <span>{stats?.user?.following}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p>TOP LANGUAGES:</p>
          <p>{topLanguages?.slice(0, -1).replaceAll("_", ", ")}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>MOST ACTIVE DAY:</span>
            <span>
              {getDayOfWeek(
                new Date(
                  stats?.contributions?.mostProductiveDay?.date
                ).toLocaleDateString()
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>COMMITS:</span>
            <span>{stats?.contributions?.mostProductiveDay?.count}</span>
          </div>
          <div className="flex justify-between">
            <span>CONTRIBUTION SCORE:</span>
            <span>
              {
                stats?.contributions?.mostActiveWeekday
                  ?.totalContributions as number
              }
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 pt-4">
          <p>Served by: Linus Torvalds</p>
          <p>06:33:23</p>
        </div>

        <div className="border-t border-b border-dashed py-4 text-center space-y-2">
          <p>COUPON CODE: GTLZVW</p>
          <p>Save for your next commit!</p>
        </div>

        <div className="space-y-1 text-sm">
          <p>CARD #: **** **** **** 2024</p>
          <p>AUTH CODE: 536869</p>
          <p className="uppercase">CARDHOLDER: {stats?.user?.login}</p>
        </div>

        <div className="text-center pt-4">
          <p className="font-bold">THANK YOU FOR CODING!</p>
        </div>

        <div className="pt-4 text-center">
          <div className="inline-block">
            <div className="h-12 bg-[linear-gradient(90deg,_#000_3px,_transparent_3px),linear-gradient(90deg,_#000_1px,_transparent_1px)] bg-[length:4px_100%,_2px_100%] w-64"></div>
            <p className="text-xs pt-2">github.com/{stats?.user?.login}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
