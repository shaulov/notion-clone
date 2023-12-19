import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemProps {
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
  expanded?: boolean;
  onExpand?: () => void;
}

export function Item({
  label, 
  onClick, 
  icon: Icon,
  id,
  documentIcon,
  active,
  isSearch,
  level = 0,
  expanded,
  onExpand,
}: ItemProps) {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const handleCreate = () => {
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id })
      .then(documentId => {
        if (!expanded) onExpand?.();
        router.push(`/documents/${documentId}`);
      });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note reated!",
      error: "Failed to create a new note."
    });
  }

  const handleArchive = () => {
    if (!id) return;
    const promise = archive({ id })
      .then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note."
    });
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  
  return (
    <div 
      className={cn(
        "group flex items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "text-primary bg-primary/5"
      )}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
    >
      {!!id && (
        <button
          className="h-full mr-1 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
          onClick={() => onExpand?.()}
        >
          <ChevronIcon className="shrink-0 w-6 h-6 p-1 text-muted-foreground/40" />
        </button>
      )}
      <button 
        className="flex items-center w-full min-h-[27px]"
        onClick={onClick}
      >
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">
            {documentIcon}
          </div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="inline-flex items-center gap-1 h-5 ml-auto px-1.5 font-mono text-[10px] font-medium text-muted-foreground bg-muted border rounded opacity-100 pointer-events-none select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </button>
      {!!id && (
        <div className="flex items-center gap-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-full ml-auto rounded-sm opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600">
                <MoreHorizontal className="w-6 h-6 p-1 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem asChild>
                <button className="w-full mr-2" onClick={handleArchive}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <p className="p-2 text-xs text-muted-foreground">Last edited by: {user?.fullName}</p>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="h-full ml-auto rounded-sm opacity-100 lg:opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={handleCreate}
          >
            <Plus className="w-6 h-6 p-1 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSceleton({ level }: { level: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{
        paddingLeft: level ? `${level * 12 + 25 }px` : "12px",
      }}
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
}