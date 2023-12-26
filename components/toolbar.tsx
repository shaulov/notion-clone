"use client";

import { useState, useRef, type ElementRef } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const handleInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const handleKeydown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      disableInput();
    }
  };

  const handleSelectIcon = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const handleRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  return (
    <div className="group relative px-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon group flex items-center gap-x-2 pt-6">
          <IconPicker onChange={handleSelectIcon}>
            <p className="text-6xl transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full text-muted-foreground opacity-100 lg:opacity-0 transition group-hover/icon:opacity-100"
            onClick={handleRemoveIcon}
            variant="outline"
            size="icon"
          >
            <span className="sr-only">Remove icon</span>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}
      <div className="flex items-center gap-x-1 py-4 opacity-100 lg:opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={handleSelectIcon}>
            <Button
              className="text-xs text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-xs text-muted-foreground"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          className="w-full text-start resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF]"
          ref={inputRef}
          value={value}
          onBlur={disableInput}
          onKeyDown={handleKeydown}
          onChange={(evt) => handleInput(evt.target.value)}
        />
      ) : (
        <button
          className="w-full text-start resize-none break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </button>
      )}
    </div>
  );
}
