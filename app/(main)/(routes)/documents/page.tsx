"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`));
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note",
    });
  };

  return (
    <section className="flex flex-col items-center justify-center space-y-4 h-full">
      <Image className="dark:hidden" src="/empty.png" width={300} height={300} alt="Empty folder" priority />
      <Image className="hidden dark:block" src="/empty-dark.png" width={300} height={300} alt="Empty folder" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create a note
      </Button>
    </section>
  );
}