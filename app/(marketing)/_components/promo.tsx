"use client";

import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Promo() {
  return (
    <section className="max-w-3xl space-y-4">
      <p className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to&nbsp;
        <span className="underline">Jotion</span>
      </p>
      <p className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens
      </p>
      <Button>
        Enter Jotion
        <ArrowRightIcon className="h-4 w-4 ml-2" />
      </Button>
    </section>
  );
}
