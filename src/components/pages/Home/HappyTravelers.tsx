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
                        <h2 className="font-bold text-4xl md:text-5xl text-center text-gray-900 mb-8">
                              Happy <span className="text-green-600">Travelers</span>
                        </h2>

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