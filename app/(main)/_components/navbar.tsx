"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Title } from "./title";
import { Banner } from "./banner";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <div className="flex items-center w-full px-3 py-2 bg-background dark:bg-[#1F1F1F]">
        <Title.Skeleton />
      </div>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-x-4 w-full px-3 py-2 bg-background dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <Button
            className="w-6 h-6 p-0 text-muted-foreground"
            variant="ghost"
            size="sm"
            onClick={onResetWidth}
          >
            <MenuIcon />
          </Button>
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </div>
      {document.isArchived && (
        <Banner documentId={document._id} />
      )}
    </>
  );
}