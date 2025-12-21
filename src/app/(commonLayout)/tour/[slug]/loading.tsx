import TopGap from "@/components/shared/TopGap";

const Skeleton = ({ className }: { className?: string }) => (
      <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const TourDetailsSkeleton = () => {
      return (
            <div className="main-container  py-8 md:py-12 ">
                  <TopGap></TopGap>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                        {/* --- LEFT COLUMN: Main Content --- */}
                        <div className="lg:col-span-2 space-y-8">

                              {/* 1. Hero Image Slider */}
                              <div className="relative w-full h-[300px] md:h-[450px] bg-gray-100 rounded-2xl overflow-hidden">
                                    <Skeleton className="w-full h-full" />
                                    {/* Optional: Navigation Arrows placeholders */}
                                    <div className="absolute bottom-4 right-4 flex gap-2">
                                          <Skeleton className="w-10 h-10 rounded-full bg-white/50" />
                                          <Skeleton className="w-10 h-10 rounded-full bg-white/50" />
                                    </div>
                              </div>

                              {/* 2. Title Section */}
                              <div className="space-y-3">
                                    <Skeleton className="h-8 md:h-10 w-3/4 lg:w-5/6" /> {/* Main Title */}
                              </div>

                              {/* 3. Info Highlights Bar (Duration, Group Size, etc.) */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    {[1, 2, 3, 4].map((i) => (
                                          <div key={i} className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                      <Skeleton className="w-4 h-4 rounded-full" />
                                                      <Skeleton className="h-3 w-16" />
                                                </div>
                                                <Skeleton className="h-4 w-24" />
                                          </div>
                                    ))}
                              </div>

                              {/* 4. Overview Section */}
                              <div className="space-y-4 pt-4">
                                    <Skeleton className="h-7 w-32 mb-2" /> {/* "Overview" Heading */}
                                    <div className="space-y-2.5 text-gray-200">
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-11/12" />
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-4/5" />
                                    </div>
                              </div>
                        </div>

                        {/* --- RIGHT COLUMN: Booking Widget --- */}
                        <div className="lg:col-span-1">
                              <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">

                                    {/* Price Header */}
                                    <div className="text-center space-y-2 border-b border-gray-100 pb-6">
                                          <div className="flex items-center justify-center gap-2">
                                                <Skeleton className="h-9 w-24 bg-green-100" /> {/* Price */}
                                                <Skeleton className="h-6 w-12" /> {/* Currency */}
                                          </div>
                                          <Skeleton className="h-3 w-40 mx-auto" />
                                    </div>

                                    {/* Tour Specs (Duration/Max Size) */}
                                    <div className="flex justify-between">
                                          <div className="space-y-1">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-4 w-12" />
                                          </div>
                                          <div className="space-y-1 text-right">
                                                <Skeleton className="h-3 w-16 ml-auto" />
                                                <Skeleton className="h-4 w-12 ml-auto" />
                                          </div>
                                    </div>

                                    {/* Inputs Form */}
                                    <div className="space-y-4 pt-2">
                                          {/* Party Size */}
                                          <div className="space-y-2">
                                                <Skeleton className="h-3 w-20" />
                                                <Skeleton className="h-12 w-full rounded-lg" />
                                          </div>

                                          {/* Date Picker */}
                                          <div className="space-y-2">
                                                <Skeleton className="h-3 w-20" />
                                                <Skeleton className="h-12 w-full rounded-lg" />
                                          </div>

                                          {/* Time Picker */}
                                          <div className="space-y-2">
                                                <Skeleton className="h-3 w-20" />
                                                <Skeleton className="h-12 w-full rounded-lg" />
                                          </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-2">
                                          <Skeleton className="h-14 w-full rounded-xl bg-green-600/20" />
                                          <div className="flex justify-center mt-4">
                                                <Skeleton className="h-3 w-32" />
                                          </div>
                                    </div>

                              </div>
                        </div>

                  </div>
            </div>
      );
};

export default TourDetailsSkeleton;