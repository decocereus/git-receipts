/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getDayOfWeek } from "@/lib/utils";
import Link from "next/link";
import { GitHubStats } from "@/service/response";
import AuthButton from "../auth";
import ShareReceipt from "../share/share";
import QrCode from "./qr-code";

function GitHubReceiptAnimated({
  stats,
  receiptGeneratedOn,
  isLoggedIn = false,
  orderNumber,
  servedAt,
}: Readonly<{
  stats: GitHubStats;
  receiptGeneratedOn: string;
  isLoggedIn?: boolean;
  orderNumber: number;
  servedAt: string;
}>) {
  const [isPrinting, setIsPrinting] = useState(true);
  const receiptRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setReceiptElement(node);
    }
  }, []);
  const [receiptElement, setReceiptElement] = useState<HTMLElement | null>(
    null
  );

  const startPrinting = () => {
    setIsPrinting(true);
    const receipt = document.querySelector(".receipts") as HTMLElement;
    if (receipt) {
      receipt.classList.remove("animate-print");
      void receipt.offsetWidth;
      receipt.classList.add("animate-print");
    }
  };
  const topLang = "";
  const topLanguages = useCallback(() => {
    return stats?.topLanguages
      ?.slice(0, 3)
      .reduce((acc, curr) => acc + `${curr?.name}_`, topLang)
      .slice(0, -1)
      .replaceAll("_", ", ");
  }, [stats]);

  useEffect(() => {
    let timer: any;
    if (!isPrinting) timer = setTimeout(() => startPrinting(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500">
      <div className="max-w-[385px] w-full">
        <div className="flex flex-col items-center mb-1 relative">
          <div className="w-[95%] sm:w-[90%] h-6 border-[5px] border-white bg-black rounded-lg shadow-md mb-[-10px]" />
        </div>

        <div className="overflow-hidden -mt-2.5 pb-2.5">
          <div className="receipts w-full flex flex-col items-center transform -translate-y-[95%] animate-print">
            <Card
              className="w-full sm:w-[88%] bg-gray-50  p-4 sm:p-8 font-mono text-sm rounded-md shadow-lg mb-2"
              ref={receiptRef}
            >
              <div className="space-y-2">
                <div className="text-center space-y-1">
                  <h1 className="text-xl font-bold">GITHUB RECEIPT</h1>
                  <p>{receiptGeneratedOn}</p>
                  {isLoggedIn ? (
                    <p className="opacity-80">ORDER #{orderNumber}</p>
                  ) : (
                    <AuthButton />
                  )}
                  <p className="text-xs">(2024 in review)</p>
                </div>

                <div className="border-t border-b border-dashed py-4 space-y-1">
                  <p>CUSTOMER: {stats?.user?.name}</p>
                  <p className="text-gray-500 font-medium">
                    @{stats?.user?.login}
                  </p>
                </div>

                <div className="space-y-1 pb-2">
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

                <div className="space-y-1 pb-2">
                  <p>TOP LANGUAGES (by %):</p>
                  <p>{topLanguages()}</p>
                </div>
                <div className="border-t border-dashed pt-4 space-y-1"></div>
                <div className="space-y-1 pb-2">
                  <div className="flex justify-between">
                    <span>MOST ACTIVE DAY:</span>
                    <span>
                      {getDayOfWeek(
                        new Date(stats?.contributions?.mostProductiveDay?.date)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>COMMITS:</span>
                    <span>
                      {stats?.contributions?.mostProductiveDay?.count}
                    </span>
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

                <div className=" border-t border-dashed py-1 space-y-1"></div>
                <div className="text-center space-y-1 py-4">
                  <p>Served at: {servedAt}</p>
                </div>
                <div className=" border-b border-dashed py-1 space-y-1"></div>

                <div className="space-y-0.5 text-sm pt-2">
                  <p>CARD #: **** **** **** 2024</p>
                  <p>AUTH CODE: {stats?.user?.id}</p>
                  <p className="uppercase">CARDHOLDER: {stats?.user?.login}</p>
                </div>

                <div className="text-center pt-4">
                  <p className="font-bold">THANK YOU FOR CODING!</p>
                  <AuthButton type="signout" />
                </div>

                <div className="pt-2 text-center">
                  <div className="inline-block">
                    <QrCode gitprofileLink={stats?.user?.html_url} />
                    <Link href={stats?.user?.html_url}>
                      <p className="text-xs pt-2">
                        github.com/{stats?.user?.login}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <ShareReceipt receiptElement={receiptElement} stats={stats} />
    </div>
  );
}

export default memo(GitHubReceiptAnimated);
