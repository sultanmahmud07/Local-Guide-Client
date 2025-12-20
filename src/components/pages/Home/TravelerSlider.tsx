// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { IUser } from "@/types/user.interface";
// import { MapPin, ChevronLeft, ChevronRight, User, ExternalLink } from "lucide-react";

// interface TravelerSliderProps {
//   travelers: IUser[];
// }

// export default function TravelerSlider({ travelers }: TravelerSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(4); 

//   // Responsive: Adjust items per view
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setItemsPerPage(1);
//       else if (window.innerWidth < 1024) setItemsPerPage(2);
//       else setItemsPerPage(4);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Auto-slide
//   useEffect(() => {
//     if (travelers.length <= itemsPerPage) return;
//     const interval = setInterval(nextSlide, 4000);
//     return () => clearInterval(interval);
//   }, [currentIndex, itemsPerPage, travelers.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => {
//       const maxIndex = travelers.length - itemsPerPage;
//       return prev >= maxIndex ? 0 : prev + 1;
//     });
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => {
//       const maxIndex = travelers.length - itemsPerPage;
//       return prev <= 0 ? maxIndex : prev - 1;
//     });
//   };

//   if (!travelers.length) return null;

//   // Calculate width for sliding logic
//   const slideWidth = 100 / itemsPerPage;

//   return (
//     <div className="relative w-full px-4 md:px-12 group">
      
//       {/* Slider Viewport */}
//       <div className="overflow-hidden w-full py-4">
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
//         >
//           {travelers.map((traveler) => (
//             <div
//               key={traveler._id}
//               className="flex-shrink-0 px-3"
//               style={{ width: `${slideWidth}%` }}
//             >
//               {/* --- PROFILE CARD START --- */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-full flex items-center gap-4 hover:shadow-md hover:border-emerald-100 transition-all duration-300 group/card">
                
//                 {/* Left: Avatar */}
//                 <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover/card:border-emerald-200 transition-colors">
//                   <Image
//                     src={traveler.picture || "/images/placeholder-user.jpg"}
//                     alt={traveler.name}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* Right: Info & Link */}
//                 <div className="flex-1 min-w-0"> 
//                   <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">
//                     {traveler.name}
//                   </h3>
                  
//                   <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
//                     <MapPin size={12} className="mr-1 text-emerald-500" />
//                     <span className="truncate max-w-[100px]">{traveler.address || "Global"}</span>
//                   </div>

//                   <Link 
//                     href={`/profile/${traveler._id}`} 
//                     className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full hover:bg-emerald-100 transition-colors"
//                   >
//                     View Profile <ExternalLink size={10} />
//                   </Link>
//                 </div>
//               </div>
//               {/* --- PROFILE CARD END --- */}
              
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Arrows (Visible on Hover) */}
//       {travelers.length > itemsPerPage && (
//         <>
//           <button onClick={prevSlide} className="absolute top-1/2 left-0 -translate-y-1/2 bg-white text-gray-600 hover:text-emerald-600 p-2 rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all z-10">
//             <ChevronLeft size={20} />
//           </button>
//           <button onClick={nextSlide} className="absolute top-1/2 right-0 -translate-y-1/2 bg-white text-gray-600 hover:text-emerald-600 p-2 rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all z-10">
//             <ChevronRight size={20} />
//           </button>
//         </>
//       )}

//       {/* Dots */}
//       <div className="flex justify-center gap-1.5 mt-4">
//         {Array.from({ length: Math.ceil(travelers.length / itemsPerPage) }).map((_, idx) => (
//           <div
//             key={idx}
//             className={`h-1.5 rounded-full transition-all duration-300 ${
//               Math.floor(currentIndex / itemsPerPage) === idx
//                 ? "w-6 bg-emerald-500"
//                 : "w-1.5 bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }