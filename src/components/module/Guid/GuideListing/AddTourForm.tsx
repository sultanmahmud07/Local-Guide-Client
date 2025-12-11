/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { createListing } from "@/services/guide/guideListing.services";

/* ---------------- ZOD VALIDATION ---------------- */
const tourSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  description: z.string().min(8),
  fee: z.number().min(0),
  durationHours: z.number().min(1),
  maxGroupSize: z.number().min(1),
  destinationCity: z.string().min(1),
  status: z.enum(["PUBLIC", "PRIVATE"]),
});

/* ---------------- COMPONENT ---------------- */
export default function AddTourForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    fee: "",
    durationHours: 1,
    maxGroupSize: 1,
    destinationCity: "",
    status: "PUBLIC" as "PUBLIC" | "PRIVATE",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- SLUG GENERATION ---------------- */
  const createSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // replace spaces + special chars with hyphen
      .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      slug: createSlug(prev.title),
    }));
  }, [form.title]);

  /* ---------------- IMAGE PREVIEW HANDLING ---------------- */
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const parsed = tourSchema.safeParse({
      ...form,
      fee: Number(form.fee),
      durationHours: Number(form.durationHours),
      maxGroupSize: Number(form.maxGroupSize),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues?.[0]?.message ?? "Invalid input");
      return;
    }

    return parsed.data;
  };

  /* ---------------- SUBMIT FORM ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validated = validate();
    if (!validated) return;

    const fd = new FormData();

    // append fields individually
    Object.entries(validated).forEach(([key, value]) => {
      fd.append(key, String(value));
    });

    // append files one by one
    files.forEach((file) => fd.append("files", file));

    setIsSubmitting(true);

    const result = await createListing(fd);

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Tour created successfully!");
      router.push("/guide/dashboard/my-listing");
    } else {
      toast.error(result.message || "Failed to create tour");
    }
  };

  return (
    <form
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6"
      onSubmit={handleSubmit}
    >
      {/* TITLE & SLUG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Amazing Street Food Tour"
          />
        </div>

        <div>
          <Label>Slug (editable)</Label>
          <Input
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: createSlug(e.target.value) })}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the experience..."
          className="h-28"
        />
      </div>

      {/* NUMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>Fee (USD)</Label>
          <Input
            type="number"
            min={0}
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
          />
        </div>

        <div>
          <Label>Duration (hours)</Label>
          <Input
            type="number"
            min={1}
            value={form.durationHours}
            onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label>Max Group Size</Label>
          <Input
            type="number"
            min={1}
            value={form.maxGroupSize}
            onChange={(e) => setForm({ ...form, maxGroupSize: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* DESTINATION */}
      <div>
        <Label>Destination City</Label>
        <Input
          placeholder="Dhaka, Bangladesh"
          value={form.destinationCity}
          onChange={(e) => setForm({ ...form, destinationCity: e.target.value })}
        />
      </div>

      {/* STATUS TOGGLE */}
      <div>
        <Label>Status</Label>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => setForm({ ...form, status: "PUBLIC" })}
            className={`px-4 py-1 rounded-md border ${form.status === "PUBLIC" ? "bg-primary text-white border-primary" : ""
              }`}
          >
            Public
          </button>

          <button
            type="button"
            onClick={() => setForm({ ...form, status: "PRIVATE" })}
            className={`px-4 py-1 rounded-md border ${form.status === "PRIVATE" ? "bg-secondary text-white border-secondary" : ""
              }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* IMAGE UPLOADER */}
      <div>
        <Label>Tour Images</Label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-5 mt-2 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
        >
          <Upload className="w-6 h-6 text-gray-500" />
          <span className="text-sm text-gray-600">Click to upload images</span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
            }}
          />
        </div>

        {/* IMAGE PREVIEWS */}
        {previews.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mt-4">
            {previews.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt="preview"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-20"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => setForm({
          title: "",
          slug: "",
          description: "",
          fee: "",
          durationHours: 1,
          maxGroupSize: 1,
          destinationCity: "",
          status: "PUBLIC",
        })}>
          Reset
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Tour"}
        </Button>
      </div>
    </form>
  );
}
