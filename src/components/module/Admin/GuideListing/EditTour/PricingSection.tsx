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

export default function PricingSection({ tour, onSaved, updateApi }: Props) {
  const [fee, setFee] = useState<number>(tour.fee ?? 0);
  const [childFee, setChildFee] = useState<number | undefined>(tour.childFee);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { fee: Number(fee), childFee: childFee === undefined ? null : Number(childFee) };
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
      <h3 className="font-medium mb-3">Pricing</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm">Fee (USD)</label>
          <Input type="number" min={0} value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm">Child Fee (optional)</label>
          <Input type="number" min={0} value={childFee ?? ""} onChange={(e) => setChildFee(e.target.value ? Number(e.target.value) : undefined)} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Pricing"}
        </Button>
      </div>
    </section>
  );
}
