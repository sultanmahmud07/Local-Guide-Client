import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Heart, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About NativeWays | Our Mission to Connect the World",
  description: "Learn about the NativeWays story. We are bridging the gap between curious travelers and passionate local experts to create authentic, unforgettable journeys.",
  keywords: [
    "about NativeWays",
    "travel startup",
    "sustainable tourism",
    "cultural exchange",
    "our story",
    "local travel community"
  ]
};

// ... Page component
const AboutPage = () => {
  return (
    <div className="bg-white pt-16 min-h-screen">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative py-20 md:py-32 bg-emerald-50 overflow-hidden">
        <div className="main-container relative z-10 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                <Globe className="w-3 h-3" /> Our Mission
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Redefining Travel through <span className="text-emerald-600">Local Connections</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                NativeWays isn&apos;t just a booking platform. It&apos;s a bridge between curious travelers and passionate locals, unlocking authentic experiences you won&apos;t find in a guidebook.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/explore?type=tours">
                   <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-2 md:px-8 py-2 md:py-4 rounded-xl text-sm md:text-lg h-auto">
                     Explore Tours
                   </Button>
                </Link>
                <Link href="/become-a-guide">
                   <Button variant="outline" className="w-full sm:w-auto border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-2 md:px-8 py-2 md:py-4 rounded-xl text-sm md:text-lg h-auto">
                     Become a Guide
                   </Button>
                </Link>
              </div>
            </div>

            {/* Image Composition */}
            <div className="w-full md:w-1/2 relative">
               <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Replace with a real image of a traveler and guide together */}
                  <Image 
                    src="https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2574&auto=format&fit=crop" 
                    alt="Travelers exploring together"
                    fill
                    className="object-cover"
                  />
               </div>
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden sm:block">
                  <div className="flex items-center gap-4">
                     <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                        <Users className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-2xl font-bold text-gray-900">10k+</p>
                        <p className="text-sm text-gray-500">Happy Travelers Connected</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. VALUES SECTION --- */}
      <section className="py-20 px-4 md:px-8">
        <div className="main-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose NativeWays?</h2>
            <p className="text-gray-500">We prioritize authenticity, safety, and economic empowerment for local communities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Access</h3>
              <p className="text-gray-500 leading-relaxed">
                Skip the tourist traps. Our guides take you to hidden gems, local eateries, and cultural sites that only locals know about.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Economic Empowerment</h3>
              <p className="text-gray-500 leading-relaxed">
                We ensure that money spent on tourism goes directly into the pockets of local guides and their communities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety & Trust</h3>
              <p className="text-gray-500 leading-relaxed">
                Every guide is verified. We provide secure payment processing and 24/7 support to ensure your journey is worry-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. OUR STORY SECTION --- */}
      <section className="py-14 md:py-20 bg-gray-900 text-white overflow-hidden">
        <div className="main-container px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
               <div className="space-y-4 mt-8">
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=2574&auto=format&fit=crop" alt="Bangladesh Nature" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-32 md:h-48 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1596484552993-841ebdf86433?q=80&w=2622&auto=format&fit=crop" alt="Local Boat" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="relative h-32 md:h-48 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1628069670007-646df4f2d579?q=80&w=2574&auto=format&fit=crop" alt="Culture" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?q=80&w=2574&auto=format&fit=crop" alt="Dhaka City" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">Our Story</h2>
              <div className="h-1 w-20 bg-emerald-500"></div>
              <p className="text-gray-300 text-lg leading-relaxed">
                NativeWays was born from a simple realization: the most memorable travel moments don&apos;t happen in 5-star hotels; they happen when you share a meal with a local family in Dhaka, navigate the Sundarbans with a boatman who knows every creek, or learn the history of Sonargaon from someone whose ancestors lived there.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We built this platform to organize the unorganized. To give skilled local guides a digital storefront and to give travelers a safe way to find them.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                   <h4 className="text-4xl font-bold text-emerald-500">50+</h4>
                   <p className="text-gray-400">Cities Covered</p>
                </div>
                <div>
                   <h4 className="text-4xl font-bold text-emerald-500">500+</h4>
                   <p className="text-gray-400">Verified Guides</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. CTA SECTION --- */}
      <section className="py-16 md:py-24 md:px-8">
         <div className="main-container bg-emerald-600 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            {/* Background Pattern (Optional) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
               <h2 className="text-3xl md:text-5xl font-bold">Ready to Start Your Journey?</h2>
               <p className="text-emerald-100 text-lg md:text-xl">
                  Whether you want to guide travelers through your hometown or explore a new city like a local, NativeWays is your starting point.
               </p>
               <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/explore?type=tours">
                  <Button className="bg-white cursor-pointer text-emerald-700 hover:bg-gray-100 px-8 py-2 md:py-4 rounded-xl text-sm md:text-lg font-bold h-auto">
                     Book a Tour Now
                  </Button>
                  </Link>
                  <Link href="/contact">
                  <Button variant="outline" className="border-white cursor-pointer text-emerald-700 hover:text-white hover:bg-white/10 px-8 py-2 md:py-4 rounded-xl text-sm md:text-lg font-bold h-auto">
                     Contact Us <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default AboutPage;