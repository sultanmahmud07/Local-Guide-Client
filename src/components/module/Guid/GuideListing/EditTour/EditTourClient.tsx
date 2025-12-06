/* eslint-disable @typescript-eslint/no-explicit-any */
// components/guide/EditTourClient.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BasicInfoSection from "./BasicInfoSection";
import MediaSection from "./MediaSection";
import PricingSection from "./PricingSection";
import DetailsSection from "./DetailsSection";

export type ITourForClient = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  fee?: number;
  childFee?: number;
  durationHours?: number;
  maxGroupSize?: number;
  destinationCity?: string;
  status?: "PUBLIC" | "PRIVATE" | "HOLD" | "SUSPENDED";
};

const EditTourClient: React.FC<{ tour: ITourForClient }> = ({ tour }) => {
  const router = useRouter();
  const [tourState, setTourState] = useState<ITourForClient>(tour);

  const updateLocal = (patch: Partial<ITourForClient>) =>
    setTourState((s) => ({ ...s, ...patch }));

  // Generic update function used by sections
  const updateTourApi = async (patchData: FormData | Record<string, any>) => {
    try {
      const id = tourState._id;
      const endpoint = `/api/guide/tours/${id}`; // <-- adapt to your backend route
      let res;
      if (patchData instanceof FormData) {
        res = await fetch(endpoint, { method: "PATCH", body: patchData });
      } else {
        res = await fetch(endpoint, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patchData),
        });
      }
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || "Update failed");
      }
      // return updated object (if backend returns updated tour)
      return result;
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Update failed");
      throw error;
    }
  };

  return (
    <div className="space-y-5">
      <BasicInfoSection
        tour={tourState}
        onSaved={(updated) => {
          updateLocal(updated);
          toast.success("Basic info saved");
        }}
        updateApi={updateTourApi}
      />
      <MediaSection
        tour={tourState}
        onSaved={(updated) => {
          updateLocal(updated);
          toast.success("Media saved");
        }}
        updateApi={updateTourApi}
      />
      <PricingSection
        tour={tourState}
        onSaved={(updated) => {
          updateLocal(updated);
          toast.success("Pricing saved");
        }}
        updateApi={updateTourApi}
      />
      <DetailsSection
        tour={tourState}
        onSaved={(updated) => {
          updateLocal(updated);
          toast.success("Details saved");
        }}
        updateApi={updateTourApi}
      />

      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded bg-primary text-white"
          onClick={() => router.push("/guide/dashboard/my-listing")}
        >
          Back to listings
        </button>
      </div>
    </div>
  );
};

export default EditTourClient;
