import { useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Id } from "@/convex/_generated/dataModel";

export function CoverImageModal() {
  const [file, setFile] = useState<File>();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const update = useMutation(api.documents.update);
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const handleClose = () => {
    setFile(undefined);
    setIsSubmiting(false);
    coverImage.onClose();
  }

  const handleChange = async (file?: File) => {
    if (file) {
      setIsSubmiting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({ file });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      handleClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmiting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
}
