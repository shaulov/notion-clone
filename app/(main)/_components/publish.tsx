"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
  className?: string;
  initialData: Doc<"documents">;
}

export function Publish({ className, initialData }: PublishProps) {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [ isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const handlePublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published!",
      error: "Failed to publish note."
    })
  };

  const handleUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    })
      .finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished!",
      error: "Failed to unpublish note."
    })
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && <Globe className="h-4 w-4 ml-2 text-sky-500" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <p className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 text-sky-500 animate-pulse" />
              <span className="text-xs font-medium text-sky-500">This note is living on web</span>
            </p>
            <div className="flex items-center">
              <input className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate" value={url} type="text" disabled />
              <Button
                className="h-8 rounded-l-none"
                onClick={handleCopy}
                disabled={copied}
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              size="sm"
              onClick={handleUnpublish}
            >
              Unpablish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">Share your work with others.</span>
            <Button
              className="w-full text-xs"
              size="sm"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}