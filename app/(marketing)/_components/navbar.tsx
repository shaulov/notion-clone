"use client";

import { cn } from "@/lib/utils";
import { SunIcon } from "lucide-react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  const scrolled = useScrollTop();
  return (
    <header className={cn(
      "fixed top-0 z-50 flex items-center w-full p-6 bg-background dark:bg-[#1F1F1F]",
      scrolled && "border-b shadow-sm"
    )}>
      <nav className="flex justify-between w-full">
        <Logo />
        <ul className="flex items-center justify-between gap-x-2 w-full md:w-auto">
          <li>
            <Button variant="ghost">Log in</Button>
          </li>
          <li>
            <Button variant="default">Get Jotion free</Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}