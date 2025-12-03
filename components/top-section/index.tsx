import Link from "next/link";
import { AtSign, Binary, Coffee } from "lucide-react";
import { Button } from "../ui/button/button";

export default function GitHubWrapped() {
  return (
    <div className="flex flex-col items-center space-y-6 max-w-2xl mx-auto text-center p-2 sm:p-8">
      <div className="space-y-4">
        <h1 className="font-mono text-3xl font-bold tracking-tight">
          GitHub Wrapped
        </h1>

        <h2 className="font-mono text-xl text-muted-foreground">
          Generate a receipt of all your contributions <br /> on Github this
          year.
        </h2>

        <p className="font-mono text-sm text-muted-foreground border rounded-md p-4 bg-muted/50">
          Data is requested for read only purposes. No data is stored at any
          point.
        </p>
      </div>

      <div className="flex items-start sm:items-center gap-x-3 text-sm text-muted-foreground flex-col sm:flex-row">
        <Link href={"https://x.com/decocereus"} target="_blank">
          <Button variant="ghost" size="sm" className="gap-2">
            Built by
            <span className="flex items-center gap-0.5">
              <AtSign className="h-4 w-4" />
              decocereus
            </span>
          </Button>
        </Link>

        <div
          className="h-4 w-px bg-border hidden sm:block"
          aria-hidden="true"
        />
        <Link href={"https://buymeacoffee.com/decocereus"} target="_blank">
          <Button variant="ghost" size="sm" className="gap-x-2">
            <Coffee className="h-4 w-4" />
            Buy me a coffee
          </Button>
        </Link>

        <div
          className="h-4 w-px bg-border hidden sm:block"
          aria-hidden="true"
        />

        <Link
          href="https://github.com/decocereus/git-receipts"
          target="_blank"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Button variant="ghost" size="sm" className="gap-x-2">
            <Binary className="h-4 w-4" />
            View Source Code
          </Button>
        </Link>
      </div>
    </div>
  );
}
