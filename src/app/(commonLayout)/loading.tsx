import TopGap from '@/components/shared/TopGap';
import React from 'react';

// A skeleton component for a single tour card within the guide's profile
const GuideTourCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gray-200 animate-pulse relative">
        {/* Heart icon placeholder */}
        <div className="absolute top-3 right-3 h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>

      <div className="p-4 space-y-3">
        {/* Info Row (Car, Time, People icons) */}
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-px bg-gray-200"></div>
          <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Guide Info (Avatar + Name) */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-2 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Footer (Price & Button) */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-2 w-12 bg-gray-100 rounded animate-pulse mt-1"></div>
          </div>
          <div className="h-8 w-16 bg-green-100 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// The main loader component for the Guide Profile page
const GuideProfileLoader = () => {
  return (
    <div className="main-container py-12">
      <TopGap />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Guide Info Sidebar Skeleton --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-24">
            
            {/* Guide Header (Avatar, Name, Price, Rating) */}
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="h-7 w-36 bg-green-50 rounded-full animate-pulse border border-green-100"></div>

            {/* Guide Details List */}
            <div className="space-y-4 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-10 bg-green-200 rounded-md animate-pulse"></div>
              <div className="h-10 bg-white border border-gray-200 rounded-md animate-pulse"></div>
            </div>

          </div>
        </div>

        {/* --- Right Column: Main Content Skeleton --- */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Introduction Section */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Listed Tours Section */}
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Display 2 skeleton cards as in the reference image */}
              <GuideTourCardSkeleton />
              <GuideTourCardSkeleton />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GuideProfileLoader;