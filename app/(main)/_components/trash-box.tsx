"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

export function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const filteredDocuments = documents?.filter(document => document.title.toLowerCase().includes(search.toLowerCase()));

  const handleClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleRestore = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    evt.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  };

  const handleRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });

    if (params.documentId === documentId) router.push("/documents");
  };

  return (
    <>
      {(documents === undefined) ? (
        <div className="flex items-center justify-center h-full p-4">
          <Spinner size="lg" />
        </div>
      ) : ( 
        <div className="text-sm">
          <form className="flex items-center gap-x-1 p-2" action="" name="search-form">
            <Search className="w-4 h-4" />
            <Input
              className="h-7 p-2 bg-secondary focus-visible:ring-transparent"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              name="search"
              placeholder="Filter by page title..."
            />
          </form>
          <ul className="mt-2 px-1 pb-1">
            <li className="hidden last:block pb-2 text-xs text-center text-muted-foreground">
              No documents found.
            </li>
            {filteredDocuments?.map(document => (
              <li
                className="flex items-center justify-between text-sm text-primary rounded-sm hover:bg-primary/5"
                key={document._id}
              >
                <button 
                  className="w-full pl-2 text-start truncate"
                  onClick={() => handleClick(document._id)}>
                  {document.title}
                </button>
                <button  
                  className="flex items-center p-2 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  onClick={(evt) => handleRestore(evt, document._id)}
                >
                  <span className="sr-only">Restore document</span>
                  <Undo className="w-4 h-4 text-muted-foreground" />
                </button>
                <ConfirmModal onConfirm={() => handleRemove(document._id)}>
                  <button  
                    className="flex items-center p-2 rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <span className="sr-only">Remove document</span>
                    <Trash className="w-4 h-4 text-muted-foreground" />
                  </button>
                </ConfirmModal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}