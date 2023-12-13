"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { MoreHorizontal, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
  className?: string;
}

export function Menu({ documentId, className }: MenuProps) {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const handleArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button size="sm" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem asChild>
          <button className="flex w-full items-center" onClick={handleArchive}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <p className="p-2 text-xs text-muted-foreground">
          Last edited by: {user?.fullName}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-9 w-10" />;
};
