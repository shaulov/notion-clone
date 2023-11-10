"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export function Promo() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <section className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to&nbsp;
        <span className="underline">Jotion</span>
      </h1>
      <p className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens
      </p>
      {isLoading && (
        <div className="flex items-center justify-center w-full">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Geet Jotion free
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </section>
  );
}
