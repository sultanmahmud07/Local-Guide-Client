/* eslint-disable @typescript-eslint/no-explicit-any */
// components/guide/edit-sections/BasicInfoSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ITourForClient } from "./EditTourClient";

type Props = {
      tour: ITourForClient;
      onSaved: (updated: Partial<ITourForClient>) => void;
      updateApi: (data: FormData | Record<string, any>) => Promise<any>;
};

const createSlug = (text: string) =>
      text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

export default function BasicInfoSection({ tour, onSaved, updateApi }: Props) {
      const [title, setTitle] = useState(tour.title || "");
      const [slug, setSlug] = useState(tour.slug || "");
      const [description, setDescription] = useState(tour.description || "");
      const [isSaving, setIsSaving] = useState(false);

      useEffect(() => {
            // auto-generate slug when title changes and slug empty or matches old auto
            setSlug((prev) => {
                  // only auto-change if user hasn't manually edited slug — heuristic:
                  // if prev is empty or equals generated from previous title then update.
                  return prev;
            });
      }, []);

      useEffect(() => {
            // update slug preview from title only if user hasn't manually changed slug
            // Simple approach: if current slug equals generated from previous title, update it.
            // Here we'll auto-update slug whenever title changes and slug is blank.
            if (!slug) {
                  setSlug(createSlug(title));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [title]);

      const handleSave = async () => {
            setIsSaving(true);
            try {
                  const payload = {
                        title,
                        slug,
                        description,
                  };
                  const res = await updateApi(payload);
                  // if backend returns updated tour, use that; otherwise use our payload
                  const updated = res?.data ?? payload;
                  onSaved(updated);
            } catch (err) {
                  // handled in updateApi
            } finally {
                  setIsSaving(false);
            }
      };

      return (
            <section className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-3">Basic Info</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                              <label className="block text-sm">Title</label>
                              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div>
                              <label className="block text-sm">Slug (editable)</label>
                              <Input value={slug} onChange={(e) => setSlug(createSlug(e.target.value))} />
                              <p className="text-xs text-muted-foreground mt-1">Only letters, numbers and dashes allowed.</p>
                        </div>

                        <div className="md:col-span-2">
                              <label className="block text-sm">Description</label>
                              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-28" />
                        </div>
                  </div>

                  <div className="flex justify-end mt-4">
                        <Button onClick={handleSave} disabled={isSaving}>
                              {isSaving ? "Saving..." : "Save Basic Info"}
                        </Button>
                  </div>
            </section>
      );
}
