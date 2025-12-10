/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { ITourForClient } from "./EditTourClient";

type Props = {
  tour: ITourForClient;
  onSaved: (updated: Partial<ITourForClient>) => void;
  updateApi: (data: FormData | Record<string, any>) => Promise<any>;
};

export default function MediaSection({ tour, onSaved, updateApi }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(tour.images ?? []);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // preview newly selected files as object URLs appended after existing previews
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((p) => {
      // keep existing string URLs + new object URLs
      const base = p.filter((x) => typeof x === "string");
      return [...base, ...newPreviews];
    });

    return () => {
      newPreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
  };
  const removePreview = (index: number) => {
    setPreviews((p) => p.filter((_, i) => i !== index));
    setFiles((prev) => {
      return prev;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const fd = new FormData();
      // Only upload new files
      files.forEach((f) => fd.append("images", f));
      // Compute deleteImages: diffs between original tour.images and current previews (strings)
      const original = tour.images ?? [];
      const currentStrings = previews.filter((p) => original.includes(p));
      const deleteImages = original.filter((img) => !currentStrings.includes(img));
      if (deleteImages.length) {
        fd.append("deleteImages", JSON.stringify(deleteImages));
      }
      const res = await updateApi(fd);
      const updated = res?.data ?? {};
      onSaved(updated);
      // clear local files (they are uploaded)
      setFiles([]);
    } catch (err) {
      // handled upstream
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Media</h3>

      <div className="border-2 border-dashed rounded-md p-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <Upload />
          <span>Click to add images (or drag & drop)</span>
        </div>
        <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {previews.map((src, idx) => (
            <div key={idx} className="relative rounded overflow-hidden bg-gray-50">
              <div style={{ position: "relative", width: "100%", height: 140 }}>
                <Image src={src} alt={`img-${idx}`} fill style={{ objectFit: "cover" }} />
              </div>
              <button
                type="button"
                onClick={() => removePreview(idx)}
                className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button variant="outline" onClick={() => { setFiles([]); setPreviews(tour.images ?? []); }}>
          Reset
        </Button>
        <Button onClick={handleSave} className="ml-3" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Media"}
        </Button>
      </div>
    </section>
  );
}
