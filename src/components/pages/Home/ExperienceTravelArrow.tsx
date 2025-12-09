import { Plane, MapPin, Globe, CheckCircle } from 'lucide-react'; // Example Icons
import { Separator } from '@/components/ui/separator';

const PRIMARY_COLOR = 'text-green-600';

const ExperienceTravelArrow = () => {
      const stepsData = [
            {
                  icon: Globe,
                  title: "1. Discover",
                  description: "Browse our hand-picked collection of local guides and customizable tours worldwide.",
            },
            {
                  icon: MapPin,
                  title: "2. Personalize",
                  description: "Message your chosen guide directly to tailor the itinerary, dates, and activities.",
            },
            {
                  icon: Plane,
                  title: "3. Book & Go",
                  description: "Finalize your booking securely through our platform and start your unique journey.",
            },
            {
                  icon: CheckCircle,
                  title: "4. Review",
                  description: "After your trip, share your experience and rate your local expert.",
            },
      ];
      if (!stepsData || stepsData.length === 0) return null;

      return (
            <div className="main-container py-12 md:py-24">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
                        Your Journey in Three Easy Steps
                  </h2>

                  {/* --- Main Grid Container --- */}
                  <div
                        // Grid structure for desktop (e.g., 3 columns)
                        className={`grid gap-x-8 gap-y-12 
                    md:grid-cols-1 
                    lg:grid-cols-${stepsData.length} 
                    relative`}
                  >
                        {stepsData.map((step, index) => (
                              <div
                                    key={index}
                                    className="flex flex-col items-center text-center relative"
                              >
                                    {/* 1. Icon Container */}
                                    <div
                                          className={`w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4 
                         border-4 border-green-200 shadow-lg ${PRIMARY_COLOR}`}
                                    >
                                          <step.icon className="w-8 h-8" />
                                    </div>

                                    {/* 2. Content */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-base max-w-xs">{step.description}</p>

                                    {/* 3. Arrow Separator (Hidden on last item, hidden on mobile stacking) */}
                                    {index < stepsData.length - 1 && (
                                          <div
                                                // Desktop Arrow (Horizontal)
                                                className={`hidden lg:block absolute left-full top-8 
                            transform -translate-y-1/2 w-8 h-8 text-gray-400`}
                                          >
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                                </svg>
                                          </div>
                                    )}

                                    {/* 4. Vertical Separator for Mobile/Tablet stacking (Optional but good for clarity) */}
                                    {index < stepsData.length - 1 && (
                                          <Separator className="block lg:hidden absolute top-full my-6 w-1 h-12 bg-gray-200" />
                                    )}
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default ExperienceTravelArrow;