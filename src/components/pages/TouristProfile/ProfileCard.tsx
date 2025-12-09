'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { ITourist } from "@/types/user.interface";

const TouristProfileCard = ({ user }: { user: ITourist }) => {
  const languagesString = user.languages?.join(', ') || 'N/A';
  
  // Since this is a tourist profile, most guide-specific fields are hidden.

  return (
    <Card className="shadow-xl border-2 border-gray-100 sticky top-24">
      <CardContent className="p-6">

        {/* --- Header (Image, Name, Role) --- */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <Image
            src={user.picture || "/default.png"}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full w-24 h-24 object-cover border-4 border-blue-400 shrink-0 shadow-md"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm font-semibold text-blue-600 mt-1">
                Traveler Profile
            </p>
          </div>
        </div>

        {/* --- Verification Badge --- */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 border-b pb-4">
          {user.isVerified ? (
            <Badge
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-sm py-1 px-3"
            >
              ✅ Verified 
            </Badge>
          )
          :
          (
            <Badge
              variant="default"
              className="bg-red-100 hover:bg-red-200 text-red-600 text-sm py-1 px-3"
            >
             Not Verified 
            </Badge>
          )
        }
          <Badge
            variant="secondary"
            className="text-sm py-1 px-3 text-white"
          >
           Role: {user.role}
          </Badge>
        </div>

        {/* --- Details List (Focusing on Contact/Location) --- */}
        <div className="space-y-4 text-base text-gray-700">
          
          {/* Bio Snippet */}
          {user.bio && (
             <div className="space-y-1">
                <span className="text-gray-500 text-sm">Bio:</span>
                <p className="text-gray-800 italic line-clamp-3">
                    {user.bio}
                </p>
             </div>
          )}

          {/* Location */}
          <div className="flex items-center">
            <span className="text-blue-600 mr-3">📍</span>
            <span>Based in <span className="font-semibold">{user.address || 'Unknown'}</span></span>
          </div>

          {/* Languages */}
          <div className="flex items-center">
            <span className="text-blue-600 mr-3">🗣️</span>
            <span>Speaks: <span className="font-semibold">{languagesString}</span></span>
          </div>
          
          {/* Phone (Optional, often hidden unless profile owner) */}
          {user.phone && (
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">📞</span>
              <span><span className="font-semibold">{user.phone}</span></span>
            </div>
          )}
        </div>

        {/* --- Action Buttons (Removed: Tourist profiles rarely have public actions) --- */}
        {/* You could add a 'Message' link here if tourists can message each other */}

      </CardContent>
    </Card>
  );
};

export default TouristProfileCard;