"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import AddListingDialog from "./CreateListingDialog";

const MyListingHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <AddListingDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="My Listing"
        action={{
          label: "Add Listing",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default MyListingHeader;
