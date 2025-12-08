"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createReview } from "@/services/review/reviews.service";
import { useRouter } from "next/navigation";

export default function TourReviewDialog({
  open,
  onClose,
  bookingId,
  tourId,
  guideId
}: {
  open: boolean;
  onClose: () => void;
  bookingId: string;
  tourId: string;
  guideId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 const router = useRouter();
  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a star rating.");
    if (comment.trim().length < 10)
      return toast.error("Comment must be at least 10 characters.");

    setIsSubmitting(true);

    const payload = {
      booking: bookingId,
      tour: tourId,
      guide: guideId,
      rating,
      comment,
    };

    const result = await createReview(payload);
    setIsSubmitting(false);

    if (result?.success) {
      toast.success("Review submitted successfully!");
       router.refresh();
      onClose();
    } else {
      toast.error(result.message || "Failed to submit review.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        {/* Star Rating */}
        <div className="flex justify-center gap-1 py-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              className={`h-8 w-8 cursor-pointer transition ${
                s <= (hover || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          ))}
        </div>

        <Textarea
          placeholder="Share your experience..."
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button className="w-full mt-4" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
