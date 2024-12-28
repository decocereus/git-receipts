/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "../ui/button/button";
import { GitHubStats } from "@/service/response";
import html2canvas from "html2canvas";
import { Download, Share2 } from "lucide-react";

const ShareReceipt = ({
  receiptElement,
  stats,
}: {
  receiptElement: any;
  stats: GitHubStats;
}) => {
  const handleDownload = async () => {
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        backgroundColor: null,
        scale: 4,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `github-receipt-${stats?.user?.login}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleShare = async () => {
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], "github-receipt.png", {
          type: "image/png",
        });

        if (navigator.share) {
          try {
            await navigator.share({
              files: [file],
              title: "My GitHub Receipt",
              text: "Check out my GitHub stats!",
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `github-receipt-${stats?.user?.login}.png`;
          link.click();
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating image for sharing:", error);
    }
  };
  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2"
        variant="ghost"
      >
        <Download size={16} />
        Download
      </Button>
      <Button
        onClick={handleShare}
        className="flex items-center gap-2"
        variant="ghost"
      >
        <Share2 size={16} />
        Share
      </Button>
    </div>
  );
};

export default ShareReceipt;
