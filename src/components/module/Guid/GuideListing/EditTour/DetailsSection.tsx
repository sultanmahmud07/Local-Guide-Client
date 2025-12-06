/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ITourForClient } from "./EditTourClient";

type Props = {
  tour: ITourForClient;
  onSaved: (updated: Partial<ITourForClient>) => void;
  updateApi: (data: FormData | Record<string, any>) => Promise<any>;
};

export default function DetailsSection({ tour, onSaved, updateApi }: Props) {
  const [durationHours, setDurationHours] = useState<number>(tour.durationHours ?? 1);
  const [maxGroupSize, setMaxGroupSize] = useState<number>(tour.maxGroupSize ?? 1);
  const [destinationCity, setDestinationCity] = useState<string>(tour.destinationCity ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { durationHours: Number(durationHours), maxGroupSize: Number(maxGroupSize), destinationCity };
      const res = await updateApi(payload);
      onSaved(res?.data ?? payload);
    } catch (err) {
      // handled upstream
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-white p-5 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm">Duration (hours)</label>
          <Input type="number" min={1} value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Max Group Size</label>
          <Input type="number" min={1} value={maxGroupSize} onChange={(e) => setMaxGroupSize(Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Destination City</label>
          <Input value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Details"}
        </Button>
      </div>
    </section>
  );
}
