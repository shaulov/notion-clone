import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="z-10 flex itemx-center w-full p-6 bg-background dark:bg-[#1F1F1F]">
      <Logo />
      <div className="flex items-center justify-between md:justify-end gap-x-2 w-full md:ml-auto text-muted-foreground">
        <Button variant="ghost" asChild>
          <Link href="">Privacy Policy</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="">Terms & Conditions</Link>
        </Button>
      </div>
    </footer>
  );
}