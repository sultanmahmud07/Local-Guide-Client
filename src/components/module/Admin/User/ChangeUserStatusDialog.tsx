"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser, UserRole, UserStatus } from "@/types/user.interface";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { updateUserStatus } from "@/services/user/userManagment.service";

interface Props {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateUserStatusDialog({ user, isOpen, onClose }: Props) {
  const [status, setStatus] = useState<UserStatus>(user.isActive);
  const [role, setRole] = useState<UserRole>(user.role);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (status === user.isActive && role === user.role) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      // Assuming your API takes { isActive, role } as payload
      const res = await updateUserStatus(user._id, { isActive: status, role });
      
      if (res?.success) {
        toast.success("User updated successfully");
        onClose();
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
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3">
             <div className="h-10 w-10 relative rounded-full overflow-hidden border">
                {/* Fallback image logic needed if using Next Image */}
                <Image width={200} height={200} src={user.picture || "/default.png"} alt="user" className="object-cover w-full h-full"/>
             </div>
             <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
             </div>
          </div>

          <div className="grid gap-4">
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
                {user.role === "SUPER_ADMIN" && (
                    <p className="text-xs text-red-500">Super Admin role cannot be modified.</p>
                )}
            </div>
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
                Updating...
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