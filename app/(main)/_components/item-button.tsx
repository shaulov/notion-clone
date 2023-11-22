import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  level?: number;
  expanded?: boolean;
  onExpand?: () => void;
}

export function ItemButton({
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
}: AddItemButtonProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;



  return (
    <div 
      className={cn(
        "group text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "text-primary bg-primary/5"
      )}
    >
      {!!id && (
        <Button 
          className="h-full mr-1 rounded-md hover:bg-neutral-300 dark:bg-neutral-600"
          variant="ghost"
          onClick={() => {}}
        >
          <ChevronIcon />
        </Button>
      )}
      <button 
        className={cn(
          "flex items-center w-full min-h-[27px] py-1 pr-3",
          `pl-[${level * 12 + 12}px]`,
          active && "text-primary bg-primary/5"
        )}
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
    </div>
  );
}