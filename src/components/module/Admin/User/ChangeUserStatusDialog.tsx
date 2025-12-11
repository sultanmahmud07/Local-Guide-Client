"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { IUser, UserRole, UserStatus } from "@/types/user.interface";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { updateUserStatus } from "@/services/user/userManagment.services";

interface Props {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateUserStatusDialog({ user, isOpen, onClose }: Props) {
  const [status, setStatus] = useState<UserStatus>(user.isActive);
  const [role, setRole] = useState<UserRole>(user.role);
  const [isVerified, setIsVerified] = useState<boolean>(user.isVerified);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const router = useRouter();
  const handleSubmit = async () => {
    // Check if any value actually changed
    if (status === user.isActive && role === user.role && isVerified === user.isVerified) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      // API call to update all fields
      const res = await updateUserStatus(user._id, {
        isActive: status,
        role: role,
        isVerified: isVerified
      });

      if (res?.success) {
        toast.success("User updated successfully");
        onClose();
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update user");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update User Access</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">

          {/* User Summary */}
          <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3">
            <div className="h-10 w-10 relative rounded-full overflow-hidden border bg-white">
              <img src={user.picture || "/default-avatar.png"} alt="user" className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">

            {/* Status Select */}
            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as UserStatus)}
                disabled={isSubmitting || user.role === "SUPER_ADMIN"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role Select */}
            <div className="space-y-2">
              <Label>User Role</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
                disabled={isSubmitting || user.role === "SUPER_ADMIN"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TOURIST">Tourist</SelectItem>
                  <SelectItem value="GUIDE">Guide</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Verification Switch */}
            <div className="flex items-center justify-between border p-3 rounded-lg">
              <div className="space-y-0.5">
                <Label className="text-base">Verified User</Label>
                <p className="text-xs text-muted-foreground">
                  Grant verified badge status
                </p>
              </div>
              <Switch
                checked={isVerified}
                onCheckedChange={setIsVerified}
                disabled={isSubmitting}
              />
            </div>

            {user.role === "SUPER_ADMIN" && (
              <p className="text-xs text-red-500 bg-red-50 p-2 rounded">
                Super Admin accounts cannot be modified.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}