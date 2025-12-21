import React from 'react';
import { Card } from '@/components/ui/card'; // Assuming you use shadcn/ui Card, otherwise use a div

const TourCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col overflow-hidden border border-gray-100 shadow-sm bg-white rounded-xl">
      {/* 1. Image Skeleton */}
      <div className="relative h-48 w-full bg-gray-200 animate-pulse">
        {/* Optional: Heart Icon placeholder top right */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full" />
      </div>

      <div className="p-4 flex flex-col grow space-y-4">
        {/* 2. Meta Info (Car, Time, People icons) */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-px bg-gray-200" /> {/* Divider */}
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 3. Guide Profile (Avatar + Name + Rating) */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
          {/* Name & Rating */}
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-2.5 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* 4. Title */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 5. Description (3 lines) */}
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* 6. Location */}
        <div className="flex items-center gap-2 pt-1">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="grow" />

        {/* 7. Footer (Price + Button) */}
        <div className="flex items-end justify-between pt-3 mt-2 border-t border-gray-50">
          <div className="space-y-1.5">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" /> {/* Price */}
            <div className="h-2.5 w-14 bg-gray-100 rounded animate-pulse" /> {/* "Includes fees" */}
          </div>
          <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse" /> {/* View Button */}
        </div>
      </div>
    </Card>
  );
};

const PopularToursSkeleton = () => {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="main-container px-4 md:px-6 lg:px-8">
        
        {/* Section Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="space-y-3 w-full max-w-lg">
            {/* Title "POPULAR TOURS" */}
            <div className="h-8 md:h-10 w-64 bg-gray-200 rounded animate-pulse" />
            {/* Subtitle */}
            <div className="h-4 w-full max-w-sm bg-gray-200 rounded animate-pulse" />
          </div>
          {/* "Explore All" Button */}
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse hidden md:block" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PopularToursSkeleton;