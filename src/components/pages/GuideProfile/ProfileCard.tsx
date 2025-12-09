'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { renderStars } from "@/components/shared/renderStars";
import { IGuide } from "@/types/user.interface";
import Link from "next/link";


const ProfileCard = ({ guide }: { guide: IGuide }) => {
  const languagesString = guide?.languages?.join(', ') || 'N/A';
  // Assuming a static response time for now, or fetch it separately
  const responseTime = "less than 8 hours";

  return (
    <Card className="shadow-lg border-none sticky top-24"> {/* Added sticky for sidebar effect */}
      <CardContent className="p-6">

        {/* --- Header (Image, Name, Rating) --- */}
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={guide?.picture ? guide.picture : "/default.png"}
            alt={guide.name}
            width={72}
            height={72}
            className="rounded-full w-16 h-16 object-cover shrink-0"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{guide.name}</h2>

            {/* Display Daily Rate */}
            {guide.guideProfile?.dailyRate && (
              <p className="text-sm font-semibold text-green-700 mt-1 mb-1">
                ${guide.guideProfile.dailyRate} / Day
              </p>
            )}

            {/* Rating Stars (Using real aggregated data) */}
            <div className="flex items-center space-x-1">
              {renderStars(guide.avg_rating || 0)} {/* Use real rating here */}
              <span className="text-xs text-gray-500 font-semibold">
                ({guide.review_count || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* --- Verified Badge / Responds Quickly --- */}
        <div className="mb-6 flex flex-wrap gap-2">
          {guide.isVerified && (
            <Badge
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 text-xs"
            >
              ✅ Verified
            </Badge>
          )}
          <Badge
            variant="outline"
            className="text-xs border-green-600 text-green-600 bg-green-50/50"
          >
            ⚡ Responds quickly
          </Badge>
        </div>

        {/* --- Details List --- */}
        <div className="space-y-3 text-sm text-gray-700">
          {/* Location */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📍</span>
            <span>Based in <span className="font-semibold">{guide.address || 'Global'}</span></span>
          </div>

          {/* Languages */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">🗣️</span>
            <span>I speak <span className="font-semibold">{languagesString}</span></span>
          </div>

          {/* Expertise */}
          {(guide?.guideProfile?.expertise?.length ?? 0) > 0 && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">🌟</span>
              <span>Expertise: <span className="font-semibold">{guide.guideProfile?.expertise?.slice(0, 2).join(', ')}</span></span>
            </div>
          )}


          {/* Response Time */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">⏰</span>
            <span>Response time <span className="font-semibold text-red-500">{responseTime}</span></span>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex space-x-3 mt-6">
          <Link className="flex-1" href={`/message/${guide?._id}`}>
          <Button
            className=" bg-green-600 w-full hover:bg-green-700 text-white"
          >
            Book Now
          </Button>
          </Link>
          <Link className="flex-1" href={`/message/${guide?._id}`}>
            <Button
              variant="outline"
              className="cursor-pointer w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              Message
            </Button>
          </Link>
        </div>

      </CardContent>
    </Card>
  );
};

export default ProfileCard;