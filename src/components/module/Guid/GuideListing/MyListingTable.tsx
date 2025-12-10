"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { myListingColumns } from "./myListingColumns";
import { ITour } from "@/types/booking.interface";
import { deleteTour } from "@/services/guide/guideListing.services";

interface MyListingTableProps {
  listingTours: ITour[];
}

export default function MyListingTable({
  listingTours = [],
}: MyListingTableProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (tour: ITour) => {
    if (!tour) {
      toast.error("Invalid tour selected");
      return;
    }
    setDeletingTour(tour);
  };

  const confirmDelete = async () => {
    if (!deletingTour) return;

    setIsDeleting(true);
    try {
      const result = await deleteTour(deletingTour._id);
      setIsDeleting(false);

      if (result?.success) {
        toast.success(result.message || "Tour deleted successfully");
        setDeletingTour(null);
        handleRefresh();
      } else {
        toast.error(result?.message || "Failed to delete tour");
      }
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
      toast.error("An error occurred while deleting the tour");
    }
  };

  return (
    <>
      <ManagementTable
        data={listingTours}
        columns={myListingColumns}
        onDelete={handleDelete}
        getRowKey={(tour) => tour._id}
        onView={(tour) => router.push(`/tour/${tour.slug}`)}
        onEdit={(tour) => router.push(`/guide/dashboard/my-listing/${tour.slug}`)}
        emptyMessage="No tours found. Try adjusting your filters or create a new tour."
      />

      <DeleteConfirmationDialog
        open={!!deletingTour}
        onOpenChange={(open) => !open && setDeletingTour(null)}
        onConfirm={confirmDelete}
        title="Delete Tour"
        description="Are you sure you want to delete this tour? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </>
  );
}
