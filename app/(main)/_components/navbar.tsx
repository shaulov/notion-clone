"use client";

import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <div className="flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <Menu.Skeleton />
      </div>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <div className="flex w-full items-center gap-x-4 bg-background px-3 py-2 dark:bg-[#1F1F1F]">
        {isCollapsed && (
          <Button
            className="h-6 w-6 p-0 text-muted-foreground"
            variant="ghost"
            size="sm"
            onClick={onResetWidth}
          >
            <MenuIcon />
          </Button>
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish className="justify-self-end" initialData={document} />
            <Menu className="justify-self-end" documentId={document._id} />
          </div>
        </div>
      </div>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
