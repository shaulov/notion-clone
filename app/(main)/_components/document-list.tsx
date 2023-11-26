"use client";

import { ReactNode, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FileIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Item } from "./item";

interface DocumentListProps {
  children?: ReactNode;
  className?: string;
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

export function DocumentList({ children, className, parentDocumentId, level = 0, data }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const handleExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <ul className={className}>
      <li
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
        style={{
          paddingLeft: level ? `${level * 12 + 32 }px` : undefined,
        }}
      >
        No pages inside
      </li>
      {documents.map(document => (
        <li key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            icon={FileIcon}
            onClick={() => handleRedirect(document._id)}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            expanded={expanded[document._id]}
            onExpand={() => handleExpand(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </li>
      ))}
      {children}
    </ul>
  );
}