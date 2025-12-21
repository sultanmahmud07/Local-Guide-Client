import React from 'react';

// --- Reusable Skeleton Primitive ---
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// --- 1. Header Skeleton ---
const HeaderSkeleton = () => {
  return (
    <div className="bg-[#1F2937] py-6 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Title */}
        <Skeleton className="h-10 w-48 bg-gray-600" />
        
        {/* Search Bar */}
        <div className="flex w-full md:w-auto max-w-xl">
          <Skeleton className="h-12 w-full md:w-96 rounded-r-none bg-gray-600" />
          <Skeleton className="h-12 w-24 rounded-l-none bg-green-600/50" />
        </div>
      </div>
    </div>
  );
};

// --- 2. Sub-Header Skeleton ---
const SubHeaderSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Tours/Guides Toggles */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        <Skeleton className="h-10 w-20 rounded-md bg-green-100" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
      {/* Showing results text */}
      <Skeleton className="h-6 w-40" />
    </div>
  );
};

// --- 3. Sidebar Filters Skeleton ---
const SidebarSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit space-y-8">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-8 w-24" />
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-28" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <span className="text-gray-300">-</span>
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-12 rounded-md bg-green-100" />
        </div>
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Language Input */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-12 rounded-md bg-green-100" />
        </div>
      </div>

      {/* Reset Button */}
      <Skeleton className="h-12 w-full rounded-md border-2 bg-transparent" />
    </div>
  );
};

// --- 4. Tour Card Skeleton ---
const TourCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative h-56">
        <Skeleton className="h-full w-full rounded-none" />
        <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/70" />
      </div>

      <div className="p-5 flex flex-col grow space-y-4">
        {/* Meta Info */}
        <div className="flex gap-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* Guide Info */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Title */}
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />

        {/* Description */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>

        <div className="grow" />

        {/* Footer (Price + Button) */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-2">
          <div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16 mt-1" />
          </div>
          <Skeleton className="h-10 w-24 rounded-md bg-green-100" />
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const ExploreToursSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSkeleton />
      
      <div className="main-container pb-16">
        <SubHeaderSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <SidebarSkeleton />
          </div>

          {/* Right Content Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Render 6 skeleton cards */}
              {Array.from({ length: 6 }).map((_, index) => (
                <TourCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreToursSkeleton;