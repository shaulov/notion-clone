"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const { user } = useUser();

  return (
    <section className="flex flex-col items-center justify-center space-y-4 h-full">
      <Image className="dark:hidden" src="/empty.png" width={300} height={300} alt="Empty folder" priority />
      <Image className="hidden dark:block" src="/empty-dark.png" width={300} height={300} alt="Empty folder" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </section>
  );
}