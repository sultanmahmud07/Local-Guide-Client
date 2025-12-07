// components/profile/profile-card.tsx
'use client';

import Image from "next/image";
import { Star } from "lucide-react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Interface (assuming it's imported or defined here)
interface GuideProfile {
  name: string;
  tagline: string;
  reviews: number;
  location: string;
  languages: string;
  isVerified: boolean;
  responseTime: string;
  imageUrl: string;
}

const ProfileCard = ({ guide }: { guide: GuideProfile }) => {
  return (
    <Card className="shadow-lg border-none">
      <CardContent className="p-6">
        
        {/* --- Header (Image, Name, Tagline, Reviews) --- */}
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={guide.imageUrl}
            alt={guide.name}
            width={72}
            height={72}
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{guide.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{guide.tagline}</p>
            <div className="flex items-center space-x-1">
              {/* Rating Stars (Static representation) */}
              {/* Note: I'm keeping the star color vibrant with green-600 */}
              <Star className="w-4 h-4 text-green-600 fill-green-600" />
              <span className="text-xs text-gray-500 font-semibold">
                {guide.reviews} reviews
              </span>
            </div>
          </div>
        </div>

        {/* --- Responds Quickly Badge --- */}
        <div className="mb-6">
          <Badge 
            variant="outline" 
            className="text-xs border-green-600 text-green-600 bg-green-50/50"
          >
            Responds quickly
          </Badge>
        </div>

        {/* --- Details List --- */}
        <div className="space-y-3 text-sm text-gray-700">
          {/* Location */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">📍</span> {/* Updated color */}
            <span>I live in <span className="font-semibold">{guide.location}</span></span>
          </div>

          {/* Languages */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">🗣️</span> {/* Updated color */}
            <span>I speak <span className="font-semibold">{guide.languages}</span></span>
          </div>
          
          {/* Verified Host */}
          {guide.isVerified && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span> {/* Updated color */}
              <span className="font-semibold">Verified Local host</span>
            </div>
          )}

          {/* Response Time - Kept red for urgency but icon updated */}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">⏰</span> {/* Updated color */}
            <span>Response time <span className="font-semibold text-red-500">{guide.responseTime}</span></span>
          </div>
        </div>

        {/* --- Buttons --- */}
        <div className="flex space-x-3 mt-6">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white" // Updated color
          >
            Book me
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-green-600 text-green-600 hover:bg-green-50" // Updated color
          >
            Contact me
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default ProfileCard;