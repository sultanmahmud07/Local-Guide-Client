
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ITourSimple = {
  _id: string;
  title: string;
  fee?: number;
  thumbnail?: string | null;
  images?: string[];
  author?: { _id?: string; name?: string; avatar?: string };
  durationHours?: number;
  maxGroupSize?: number;
  destinationCity?: string;
};

export default function BookingSummaryClient({ tour }: { tour: ITourSimple }) {
  const router = useRouter();
  const fee = typeof tour.fee === "number" ? tour.fee : Number(tour.fee ?? 0);
  const defaultPeople = 1;
  const subTotal = fee * defaultPeople;
  const serviceFee = +(subTotal * 0.07); // example 7%
  const total = +(subTotal + serviceFee);

  const thumbnail = tour.thumbnail ?? (Array.isArray(tour.images) && tour.images.length ? tour.images[0] : "/images/placeholder-800x520.jpg");

  return (
    <aside className="sticky top-28">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="w-20 h-14 rounded overflow-hidden bg-gray-100">
            <Image src={thumbnail} alt={tour.title} width={160} height={120} className="object-cover" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{tour.title}</div>
            <div className="text-xs text-gray-500 mt-1">Tour guide: {tour.author?.name ?? "—"}</div>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <div className="flex justify-between">
            <div className="text-gray-600">Party size</div>
            <div>1 person</div>
          </div>

          <div className="flex justify-between mt-2">
            <div className="text-gray-600">Date</div>
            <div>Choose on left</div>
          </div>

          <div className="flex justify-between mt-2">
            <div className="text-gray-600">Tour guide</div>
            <div>{tour.author?.name ?? "—"}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-lg font-semibold mb-3">Price details</div>

        <div className="flex justify-between text-sm">
          <div>Tour cost</div>
          <div>${subTotal.toFixed(2)} USD</div>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <div>Service fee</div>
          <div>${serviceFee.toFixed(2)} USD</div>
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between items-center font-semibold">
          <div>Total</div>
          <div>${total.toFixed(2)} USD</div>
        </div>

        <div className="mt-4">
          <Button className="w-full bg-emerald-700 text-white" onClick={() => router.push("/")}>Message To Guide</Button>
        </div>
      </div>
    </aside>
  );
}
