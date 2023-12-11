"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export function Banner({ documentId }: BannerProps) {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const handleRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const handleRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="flex items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page in in the trash</p>
      <Button
        className="boreder-white h-auto bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        size="sm"
        variant="outline"
        onClick={handleRestore}
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={handleRemove}>
        <Button
          className="boreder-white h-auto bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
          size="sm"
          variant="outline"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
