/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, PlusCircle, Image as ImageIcon } from "lucide-react";
import { updateListing } from "@/services/guide/guideListing.services"; // your api helper

type TourTransportationMode =
      | "Walking"
      | "Biking"
      | "Private Transport"
      | "Public Transport"
      | "Other";

type Language = "English" | "Spanish" | "French" | "German" | "Other";
type TourCategory = "Food" | "Art" | "Adventure" | "History" | "Nature" | "Other";
type TourStatus = "PUBLIC" | "PRIVATE" | "HOLD" | "SUSPENDED";

interface IExistingTour {
      _id: string;
      title: string;
      slug: string;
      description?: string;
      fee?: number;
      durationHours?: number;
      maxGroupSize?: number;
      destinationCity?: string;
      startTime?: string[];
      thumbnail?: string | null; // existing thumbnail url
      images?: string[]; // existing gallery urls
      childFee?: number;
      meetingPoint?: string;
      transportationMode?: TourTransportationMode;
      itinerary?: string[];
      importantPoints?: string[];
      cancellationPolicy?: string[];
      inclusionsAndExclusions?: { inclusions: string[]; exclusions: string[] };
      language?: Language;
      category?: TourCategory;
      isActive?: boolean;
      status?: TourStatus;
}

interface UpdateTourFormProps {
      id: string;
      initialData: IExistingTour;
}

const sanitizeSlug = (v = "") =>
      v
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

export default function UpdateTourForm({ id, initialData }: UpdateTourFormProps) {
      const router = useRouter();

      // Form state prefilled with initialData
      const [title, setTitle] = useState(initialData.title || "");
      const [slug, setSlug] = useState(initialData.slug || "");
      const [manualSlugEdit, setManualSlugEdit] = useState(false);
      const [description, setDescription] = useState(initialData.description || "");
      const [fee, setFee] = useState<number | "">(
            typeof initialData.fee === "number" ? initialData.fee : ""
      );
      const [durationHours, setDurationHours] = useState<number | "">(
            typeof initialData.durationHours === "number" ? initialData.durationHours : ""
      );
      const [maxGroupSize, setMaxGroupSize] = useState<number | "">(
            typeof initialData.maxGroupSize === "number" ? initialData.maxGroupSize : ""
      );
      const [destinationCity, setDestinationCity] = useState(initialData.destinationCity || "");

      // arrays
      const [startTime, setStartTime] = useState<string[]>(initialData.startTime || []);
      const [itinerary, setItinerary] = useState<string[]>(initialData.itinerary || []);
      const [importantPoints, setImportantPoints] = useState<string[]>(initialData.importantPoints || []);
      const [cancellationPolicy, setCancellationPolicy] = useState<string[]>(initialData.cancellationPolicy || []);
      const [inclusions, setInclusions] = useState<string[]>(
            initialData.inclusionsAndExclusions?.inclusions || []
      );
      const [exclusions, setExclusions] = useState<string[]>(
            initialData.inclusionsAndExclusions?.exclusions || []
      );

      // meta
      const [language, setLanguage] = useState<Language>(initialData.language || "English");
      const [category, setCategory] = useState<TourCategory>(initialData.category || "Food");
      const [isActive, setIsActive] = useState<boolean>(initialData.isActive ?? true);
      const [status, setStatus] = useState<TourStatus>(initialData.status || "PUBLIC");
      const [transportationMode, setTransportationMode] = useState<TourTransportationMode | "">(
            initialData.transportationMode || ""
      );
      const [childFee, setChildFee] = useState<number | "">(
            typeof initialData.childFee === "number" ? initialData.childFee : ""
      );
      const [meetingPoint, setMeetingPoint] = useState<string>(initialData.meetingPoint || "");

      // thumbnail: existing url + optional new file
      const [existingThumbnailUrl, setExistingThumbnailUrl] = useState<string | null>(initialData.thumbnail || null);
      const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null);
      const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null);

      // images: existing URLs (editable selection) + new files
      const [existingImages, setExistingImages] = useState<string[]>(initialData.images || []);
      const [markedToDelete, setMarkedToDelete] = useState<string[]>([]); // URLs selected to delete
      const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
      const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

      const [tempInput, setTempInput] = useState<Record<string, string>>({
            startTime: "",
            itinerary: "",
            importantPoints: "",
            cancellationPolicy: "",
            inclusion: "",
            exclusion: "",
      });

      const [isSubmitting, setIsSubmitting] = useState(false);

      // auto-generate slug from title until manual edit
      useEffect(() => {
            if (!manualSlugEdit) {
                  setSlug(sanitizeSlug(title));
            }
      }, [title, manualSlugEdit]);

      // cleanup object URLs
      useEffect(() => {
            return () => {
                  newImagePreviews.forEach((p) => p && p.startsWith("blob:") && URL.revokeObjectURL(p));
                  if (newThumbnailPreview && newThumbnailPreview.startsWith("blob:")) URL.revokeObjectURL(newThumbnailPreview);
            };
      }, [newImagePreviews, newThumbnailPreview]);

      // helper for array add/remove
      const addArrayItem = (key: string) => {
            const v = (tempInput as any)[key]?.trim();
            if (!v) return toast.error("Please enter a value");
            switch (key) {
                  case "startTime":
                        setStartTime((s) => [...s, v]);
                        break;
                  case "itinerary":
                        setItinerary((s) => [...s, v]);
                        break;
                  case "importantPoints":
                        setImportantPoints((s) => [...s, v]);
                        break;
                  case "cancellationPolicy":
                        setCancellationPolicy((s) => [...s, v]);
                        break;
                  case "inclusion":
                        setInclusions((s) => [...s, v]);
                        break;
                  case "exclusion":
                        setExclusions((s) => [...s, v]);
                        break;
            }
            setTempInput((t) => ({ ...t, [key]: "" }));
      };

      const removeArrayItem = (key: string, index: number) => {
            switch (key) {
                  case "startTime":
                        setStartTime((s) => s.filter((_, i) => i !== index));
                        break;
                  case "itinerary":
                        setItinerary((s) => s.filter((_, i) => i !== index));
                        break;
                  case "importantPoints":
                        setImportantPoints((s) => s.filter((_, i) => i !== index));
                        break;
                  case "cancellationPolicy":
                        setCancellationPolicy((s) => s.filter((_, i) => i !== index));
                        break;
                  case "inclusions":
                        setInclusions((s) => s.filter((_, i) => i !== index));
                        break;
                  case "exclusions":
                        setExclusions((s) => s.filter((_, i) => i !== index));
                        break;
            }
      };

      // thumbnail selection
      const handleThumbnailChange = (f?: File | null) => {
            if (!f) return;
            setNewThumbnailFile(f);
            setNewThumbnailPreview(URL.createObjectURL(f));
      };

      // gallery new images selection
      const handleNewImages = (files: FileList | null) => {
            if (!files) return;
            const arr = Array.from(files);
            const previews = arr.map((f) => URL.createObjectURL(f));
            setNewImageFiles((p) => [...p, ...arr]);
            setNewImagePreviews((p) => [...p, ...previews]);
      };

      const removeNewImage = (index: number) => {
            const preview = newImagePreviews[index];
            if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
            setNewImageFiles((p) => p.filter((_, i) => i !== index));
            setNewImagePreviews((p) => p.filter((_, i) => i !== index));
      };

      const toggleMarkExistingImage = (url: string) => {
            setMarkedToDelete((prev) => (prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]));
      };

      const validate = (): { ok: boolean; message?: string } => {
            if (!title || title.trim().length < 3) return { ok: false, message: "Title must be at least 3 characters." };
            if (!slug || slug.trim().length < 1) return { ok: false, message: "Slug required." };
            if (!description || description.trim().length < 10) return { ok: false, message: "Description must be at least 10 characters." };
            if (fee === "" || Number.isNaN(Number(fee))) return { ok: false, message: "Fee is required and must be a number." };
            if (durationHours === "" || Number.isNaN(Number(durationHours))) return { ok: false, message: "Duration required and must be a number." };
            if (maxGroupSize === "" || Number.isNaN(Number(maxGroupSize))) return { ok: false, message: "Max group size required and must be a number." };
            if (!destinationCity || destinationCity.trim().length < 2) return { ok: false, message: "Destination city required." };
            return { ok: true };
      };

      // submit: builds FormData and calls updateListing(fd, id)
      const handleSubmit = async (e?: React.FormEvent) => {
            e?.preventDefault();
            const v = validate();
            if (!v.ok) {
                  return toast.error(v.message);
            }

            setIsSubmitting(true);
            try {
                  const payload: Record<string, any> = {
                        title: title.trim(),
                        slug: slug.trim(),
                        description: description.trim(),
                        fee: Number(fee),
                        durationHours: Number(durationHours),
                        maxGroupSize: Number(maxGroupSize),
                        destinationCity: destinationCity.trim(),
                        startTime,
                        childFee: childFee === "" ? undefined : Number(childFee),
                        meetingPoint: meetingPoint || undefined,
                        transportationMode: transportationMode || undefined,
                        itinerary,
                        importantPoints,
                        cancellationPolicy,
                        inclusionsAndExclusions: {
                              inclusions,
                              exclusions,
                        },
                        language,
                        category,
                        isActive,
                        status,
                  };

                  const fd = new FormData();

                  Object.entries(payload).forEach(([k, v]) => {
                        if (v === undefined || v === null) return;

                        // For arrays, objects and booleans send as a JSON Blob so multipart parsers
                        // can expose a parsable JSON payload rather than a plain string.
                        if (Array.isArray(v) || typeof v === "object" || typeof v === "boolean") {
                              const blob = new Blob([JSON.stringify(v)], { type: "application/json" });
                              fd.append(k, blob);
                        } else {
                              fd.append(k, String(v));
                        }
                  });

                  // thumbnail file (if selected)
                  if (newThumbnailFile) {
                        fd.append("thumbnail", newThumbnailFile);
                  }

                  // append new gallery images as `files`
                  newImageFiles.forEach((f) => fd.append("files", f));

                  // send deleteImages array (urls) if any
                  if (markedToDelete.length > 0) {
                        fd.append("deleteImages", JSON.stringify(markedToDelete));
                  }

                  // call update API
                  const result = await updateListing(fd, initialData._id);

                  if (result?.success) {
                        toast.success(result.message || "Tour updated successfully");
                        //   router.push("/my-listing");
                  } else {
                        toast.error(result?.message || "Update failed");
                  }
            } catch (err: any) {
                  console.error("update error", err);
                  toast.error(err?.message || "Something went wrong");
            } finally {
                  setIsSubmitting(false);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                              <label className="text-sm font-medium">Title</label>
                              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full p-2 border rounded" />
                        </div>

                        <div>
                              <label className="text-sm font-medium">Slug</label>
                              <input
                                    value={slug}
                                    onChange={(e) => {
                                          setManualSlugEdit(true);
                                          setSlug(sanitizeSlug(e.target.value));
                                    }}
                                    className="mt-2 w-full p-2 border rounded"
                              />
                        </div>

                        <div className="md:col-span-2">
                              <label className="text-sm font-medium">Description</label>
                              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full p-2 border rounded min-h-[120px]" />
                        </div>

                        <div>
                              <label className="text-sm font-medium">Fee</label>
                              <input type="number" min={0} value={fee as any} onChange={(e) => setFee(e.target.value === "" ? "" : Number(e.target.value))} className="mt-2 w-full p-2 border rounded" />
                        </div>

                        <div>
                              <label className="text-sm font-medium">Duration (hours)</label>
                              <input type="number" min={1} value={durationHours as any} onChange={(e) => setDurationHours(e.target.value === "" ? "" : Number(e.target.value))} className="mt-2 w-full p-2 border rounded" />
                        </div>

                        <div>
                              <label className="text-sm font-medium">Max Group Size</label>
                              <input type="number" min={1} value={maxGroupSize as any} onChange={(e) => setMaxGroupSize(e.target.value === "" ? "" : Number(e.target.value))} className="mt-2 w-full p-2 border rounded" />
                        </div>

                        <div>
                              <label className="text-sm font-medium">Destination City</label>
                              <input value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} className="mt-2 w-full p-2 border rounded" />
                        </div>
                  </div>

                  {/* Arrays UI (startTime, itinerary, etc.) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                              <label className="text-sm font-medium">Start Times</label>
                              <div className="flex gap-2 mt-2">
                                    <input value={tempInput.startTime} onChange={(e) => setTempInput((t) => ({ ...t, startTime: e.target.value }))} className="flex-1 p-2 border rounded" placeholder="09:00" />
                                    <button type="button" onClick={() => addArrayItem("startTime")} className="px-3 py-1 bg-primary text-white rounded inline-flex items-center gap-2">
                                          <PlusCircle className="w-4 h-4" /> Add
                                    </button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                    {startTime.map((s, i) => (
                                          <span key={i} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                                                {s} <button type="button" onClick={() => removeArrayItem("startTime", i)}><Trash2 className="w-3 h-3 text-red-600" /></button>
                                          </span>
                                    ))}
                              </div>
                        </div>

                        <div>
                              <label className="text-sm font-medium">Itinerary (add steps)</label>
                              <div className="flex gap-2 mt-2">
                                    <input value={tempInput.itinerary} onChange={(e) => setTempInput((t) => ({ ...t, itinerary: e.target.value }))} className="flex-1 p-2 border rounded" placeholder="Step description" />
                                    <button type="button" onClick={() => addArrayItem("itinerary")} className="px-3 py-1 bg-primary text-white rounded inline-flex items-center gap-2">
                                          <PlusCircle className="w-4 h-4" /> Add
                                    </button>
                              </div>
                              <div className="mt-2 space-y-2">
                                    {itinerary.map((it, i) => (
                                          <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                <div className="text-sm">{it}</div>
                                                <button type="button" onClick={() => removeArrayItem("itinerary", i)}><Trash2 className="w-4 h-4 text-red-600" /></button>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* Images section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded">
                              <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                          <ImageIcon className="w-5 h-5" />
                                          <h4 className="font-medium">Thumbnail</h4>
                                    </div>
                                    <small className="text-xs text-muted-foreground">single</small>
                              </div>

                              <div className="mt-3">
                                    {newThumbnailPreview ? (
                                          <div className="relative w-full h-36 rounded overflow-hidden">
                                                <img src={newThumbnailPreview} alt="thumb" className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => { setNewThumbnailFile(null); URL.revokeObjectURL(newThumbnailPreview); setNewThumbnailPreview(null); }} className="absolute top-2 right-2 bg-white p-1 rounded-full"><Trash2 className="w-4 h-4 text-red-600" /></button>
                                          </div>
                                    ) : existingThumbnailUrl ? (
                                          <div className="relative w-full h-36 rounded overflow-hidden">
                                                {/* use next/image for external url */}
                                                <Image src={existingThumbnailUrl} alt="thumb" fill style={{ objectFit: "cover" }} />
                                                <button type="button" onClick={() => setExistingThumbnailUrl(null)} className="absolute top-2 right-2 bg-white p-1 rounded-full"><Trash2 className="w-4 h-4 text-red-600" /></button>
                                          </div>
                                    ) : (
                                          <label className="block cursor-pointer rounded border border-dashed p-4 text-center">
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleThumbnailChange(e.target.files ? e.target.files[0] : undefined)} />
                                                <div className="flex flex-col items-center gap-2">
                                                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                                      <div className="text-sm">Upload thumbnail</div>
                                                </div>
                                          </label>
                                    )}
                              </div>
                        </div>

                        <div className="p-3 border rounded">
                              <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                          <ImageIcon className="w-5 h-5" />
                                          <h4 className="font-medium">Gallery Images</h4>
                                    </div>
                                    <small className="text-xs text-muted-foreground">multiple</small>
                              </div>

                              <div className="mt-3">
                                    <label className="block cursor-pointer rounded border border-dashed p-3 text-center">
                                          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleNewImages(e.target.files)} />
                                          <div className="text-sm">Select images</div>
                                          <div className="text-xs text-muted-foreground mt-1">You can upload multiple files</div>
                                    </label>

                                    <div className="mt-3 grid grid-cols-3 gap-2">
                                          {/* new previews */}
                                          {newImagePreviews.map((p, i) => (
                                                <div key={i} className="relative h-24 rounded overflow-hidden bg-gray-50">
                                                      <img src={p} alt={`new-${i}`} className="w-full h-full object-cover" />
                                                      <button type="button" onClick={() => removeNewImage(i)} className="absolute top-1 right-1 bg-white p-1 rounded-full"><Trash2 className="w-4 h-4 text-red-600" /></button>
                                                </div>
                                          ))}

                                          {/* existing images (mark to delete) */}
                                          {existingImages.map((url, idx) => {
                                                const marked = markedToDelete.includes(url);
                                                return (
                                                      <div key={idx} className={`relative h-24 rounded overflow-hidden ${marked ? "opacity-40" : ""}`}>
                                                            {/* next/image for remote url */}
                                                            <Image src={url} alt={`existing-${idx}`} fill style={{ objectFit: "cover" }} />
                                                            <button type="button" onClick={() => toggleMarkExistingImage(url)} className="absolute top-1 right-1 bg-white p-1 rounded-full" title={marked ? "Undo remove" : "Mark to delete"}>
                                                                  <Trash2 className="w-4 h-4 text-red-600" />
                                                            </button>
                                                      </div>
                                                );
                                          })}
                                    </div>
                                    {markedToDelete.length > 0 && <p className="text-xs text-red-600 mt-2">{markedToDelete.length} image(s) marked to delete — these will be removed on update.</p>}
                              </div>
                        </div>
                  </div>

                  {/* meta / arrays small controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                              <label className="text-sm font-medium">Language</label>
                              <select value={language} onChange={(e) => setLanguage(e.target.value as Language)} className="mt-2 w-full p-2 border rounded">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                    <option>German</option>
                                    <option>Other</option>
                              </select>
                        </div>

                        <div>
                              <label className="text-sm font-medium">Category</label>
                              <select value={category} onChange={(e) => setCategory(e.target.value as TourCategory)} className="mt-2 w-full p-2 border rounded">
                                    <option>Food</option>
                                    <option>Art</option>
                                    <option>Adventure</option>
                                    <option>History</option>
                                    <option>Nature</option>
                                    <option>Other</option>
                              </select>
                        </div>

                        <div>
                              <label className="text-sm font-medium">Status</label>
                              <div className="mt-2 flex gap-2">
                                    <button type="button" onClick={() => setStatus("PUBLIC")} className={`px-3 py-1 rounded ${status === "PUBLIC" ? "bg-primary text-white" : "bg-gray-100"}`}>Public</button>
                                    <button type="button" onClick={() => setStatus("PRIVATE")} className={`px-3 py-1 rounded ${status === "PRIVATE" ? "bg-primary text-white" : "bg-gray-100"}`}>Private</button>
                              </div>
                        </div>
                  </div>

                  {/* inclusions / exclusions quick add */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                              <label className="text-sm font-medium">Inclusions</label>
                              <div className="flex gap-2 mt-2">
                                    <input value={tempInput.inclusion} onChange={(e) => setTempInput((t) => ({ ...t, inclusion: e.target.value }))} className="flex-1 p-2 border rounded" placeholder="Bottled water" />
                                    <button type="button" onClick={() => addArrayItem("inclusion")} className="px-3 py-1 bg-primary text-white rounded"><PlusCircle className="w-4 h-4" /></button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                    {inclusions.map((inc, i) => (
                                          <div key={i} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                                                {inc} <button type="button" onClick={() => removeArrayItem("inclusions", i)}><Trash2 className="w-3 h-3 text-red-600" /></button>
                                          </div>
                                    ))}
                              </div>
                        </div>

                        <div>
                              <label className="text-sm font-medium">Exclusions</label>
                              <div className="flex gap-2 mt-2">
                                    <input value={tempInput.exclusion} onChange={(e) => setTempInput((t) => ({ ...t, exclusion: e.target.value }))} className="flex-1 p-2 border rounded" placeholder="Gratuities" />
                                    <button type="button" onClick={() => addArrayItem("exclusion")} className="px-3 py-1 bg-primary text-white rounded"><PlusCircle className="w-4 h-4" /></button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                    {exclusions.map((ex, i) => (
                                          <div key={i} className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                                                {ex} <button type="button" onClick={() => removeArrayItem("exclusions", i)}><Trash2 className="w-3 h-3 text-red-600" /></button>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* actions */}
                  <div className="flex gap-3 justify-end">
                        <button type="button" onClick={() => {
                              // reset to initial data
                              setTitle(initialData.title || "");
                              setSlug(initialData.slug || "");
                              setManualSlugEdit(false);
                              setDescription(initialData.description || "");
                              setFee(initialData.fee ?? "");
                              setDurationHours(initialData.durationHours ?? "");
                              setMaxGroupSize(initialData.maxGroupSize ?? "");
                              setDestinationCity(initialData.destinationCity || "");
                              setStartTime(initialData.startTime || []);
                              setItinerary(initialData.itinerary || []);
                              setImportantPoints(initialData.importantPoints || []);
                              setCancellationPolicy(initialData.cancellationPolicy || []);
                              setInclusions(initialData.inclusionsAndExclusions?.inclusions || []);
                              setExclusions(initialData.inclusionsAndExclusions?.exclusions || []);
                              setExistingThumbnailUrl(initialData.thumbnail || null);
                              setNewThumbnailFile(null);
                              setNewThumbnailPreview(null);
                              setExistingImages(initialData.images || []);
                              setMarkedToDelete([]);
                              setNewImageFiles([]);
                              setNewImagePreviews([]);
                              toast.success("Reset to original values");
                        }} className="px-4 py-2 border rounded">Reset</button>

                        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-white rounded">
                              {isSubmitting ? "Updating..." : "Update Tour"}
                        </button>
                  </div>
            </form>
      );
}
