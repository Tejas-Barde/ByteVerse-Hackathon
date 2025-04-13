"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createWorker } from "tesseract.js"

interface ImageUploadProps {
  onImageUpload: (image: string) => void;
  isLoading?: boolean;
}

export function ImageUpload({ onImageUpload, isLoading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;
          setPreview(base64String);
          const worker = await createWorker('eng')
          const ret = await worker.recognize(base64String)
          onImageUpload(ret.data.text);
          worker.terminate()
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "flex min-h-[200px] cursor-pointer items-center justify-center p-4",
        isDragActive && "border-primary",
        isLoading && "opacity-50"
      )}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Processing image...</p>
        </div>
      ) : preview ? (
        <img
          src={preview}
          alt="Uploaded preview"
          className="max-h-[400px] rounded-lg object-contain"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImagePlus className="h-8 w-8" />
          <p>Drop an image here or click to upload</p>
        </div>
      )}
    </Card>
  );
}