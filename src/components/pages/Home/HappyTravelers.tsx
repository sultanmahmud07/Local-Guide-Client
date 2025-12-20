// app/components/HappyTravelers.tsx
import { getFeaturedTourist } from "@/services/public/guide.services";
import { IUser } from "@/types/user.interface"; // Assuming IUser is the base type
import TouristCard from "./TouristCard";

export default async function HappyTravelers() {
      // Assuming getFeaturedTourist returns { data: IUser[] }
      const touristResponse = await getFeaturedTourist("limit=4");
      const featuredTourists: IUser[] = touristResponse?.data || [];

      return (
            <section className="w-full bg-gray-50 py-10 md:py-16">
                  <div className="main-container">
                        <div className="space-y-1 text-center mb-5 md:mb-10">
                              <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
                                    Happy <span className="text-emerald-700">Travelers</span>
                              </h2>
                              <p className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto">
                                    Real stories from adventurers who explored the world the native way.
                              </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                              {featuredTourists.length > 0 ? (
                                    featuredTourists.map((tourist) => (
                                          <TouristCard
                                                key={tourist._id}
                                                user={tourist}
                                          />
                                    ))
                              ) : (
                                    <div className="lg:col-span-4 text-center py-10 text-gray-500 border border-dashed rounded-lg">
                                          No featured travelers available right now.
                                    </div>
                              )}
                        </div>
                  </div>
            </section>
      );
}