"use client";

import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <header className={cn(
      "fixed top-0 z-50 flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F]",
      scrolled && "border-b shadow-sm"
    )}>
      <nav className="flex justify-between w-full">
        <Logo />
        <ul className="flex items-center justify-between gap-x-2 w-full md:w-auto">
          {isLoading && (
            <li>
              <Spinner />
            </li>
          )}
          {!isAuthenticated && !isLoading && (
            <>
              <li>
                <SignInButton mode="modal">
                  <Button variant="ghost">Log in</Button>
                </SignInButton>
              </li>
              <li>
                <SignInButton mode="modal">
                  <Button size="sm">Get Jotion free</Button>
                </SignInButton>
              </li>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <li>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/documents">
                    Enter Jotion
                  </Link>
                </Button>
              </li>
              <li>
                <UserButton
                  afterSignOutUrl="/"
                />
              </li>
            </>
          )}
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}