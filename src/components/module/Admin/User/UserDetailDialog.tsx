"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IUser } from "@/types/user.interface";
import { format } from "date-fns";
import Image from "next/image";
import { Mail, Phone, MapPin, User, Shield, Calendar } from "lucide-react";

interface Props {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailDialog({ user, open, onClose }: Props) {
  if (!user) return null;

  const isGuide = user.role === "GUIDE";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          
          {/* Header Profile Section */}
          <div className="flex items-start gap-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image 
                src={user.picture || "/default-avatar.png"} 
                alt={user.name} 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs font-normal">
                        {user.role.replace("_", " ")}
                    </Badge>
                    {user.isVerified && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none text-[10px] px-1.5 py-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge variant={user.isActive === "ACTIVE" ? "default" : "destructive"}>
                  {user.isActive}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm border-b pb-2">
                    <User className="w-4 h-4 text-primary" /> Personal Information
                </h4>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{user.phone || "No phone number"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{user.address || "No address provided"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">Joined {format(new Date(user.createdAt), "PPP")}</span>
                    </div>
                </div>
            </div>

            {/* Guide Specific Info */}
            {isGuide && user.guideProfile && (
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm border-b pb-2">
                        <Shield className="w-4 h-4 text-emerald-600" /> Guide Profile
                    </h4>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="text-gray-500 text-xs block mb-1">Daily Rate</span>
                            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                                ${user.guideProfile.dailyRate} / day
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-xs block mb-1">Expertise</span>
                            <div className="flex flex-wrap gap-1">
                                {user.guideProfile.expertise.map(ex => (
                                    <Badge key={ex} variant="outline" className="text-xs">{ex}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Bio Section */}
          {user?.bio && (
            <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">About</h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {user.bio}
                </p>
            </div>
          )}

        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}