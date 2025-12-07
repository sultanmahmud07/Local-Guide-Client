// import { IGuide } from '@/types/guide.interface'
// import Image from 'next/image';
// import React from 'react'

// const GuideCard = ({ guide }: { guide: IGuide }) => {

//       const StarIcon = () => (
//             <svg
//                   viewBox="0 0 24 24"
//                   className="w-4 h-4 text-yellow-400"
//                   aria-hidden
//                   fill="currentColor"
//             >
//                   <path d="M12 2l2.9 6.1L22 9.2l-5 4.9L18 21l-6-3.2L6 21l1-6.9-5-4.9 7.1-1.1L12 2z" />
//             </svg>
//       );

//       const LocationIcon = () => (
//             <svg
//                   viewBox="0 0 24 24"
//                   className="w-4 h-4 text-gray-500"
//                   aria-hidden
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.6"
//             >
//                   <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
//                   <circle cx="12" cy="10" r="2.5" />
//             </svg>
//       );

//       const GlobeIcon = () => (
//             <svg
//                   viewBox="0 0 24 24"
//                   className="w-4 h-4 text-gray-500"
//                   aria-hidden
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.6"
//             >
//                   <circle cx="12" cy="12" r="9" />
//                   <path d="M3 12h18M12 3a12 12 0 0 1 3 9 12 12 0 0 1-3 9 12 12 0 0 1-3-9 12 12 0 0 1 3-9z" />
//             </svg>
//       );

//       const HeartIcon = () => (
//             <svg
//                   viewBox="0 0 24 24"
//                   className="w-5 h-5 text-gray-400"
//                   aria-hidden
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.6"
//             >
//                   <path d="M12 20s-5.5-3.3-8.2-6A4.8 4.8 0 0 1 12 5.3 4.8 4.8 0 0 1 20.2 14c-2.7 2.7-8.2 6-8.2 6z" />
//             </svg>
//       );

//       return (
//             <article
//                   key={guide.id}
//                   className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-1 hover:shadow-lg"
//             >
//                   {/* Image */}
//                   <div className="relative w-full h-56 sm:h-60">
//                         <Image
//                               src={guide.image}
//                               alt={guide.name}
//                               fill
//                               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                               className="object-cover"
//                         />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 px-5 pt-4 pb-3">
//                         <div className="flex items-start justify-between gap-3 mb-1">
//                               <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
//                                     {guide.name}
//                               </h3>
//                               <button
//                                     type="button"
//                                     className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white"
//                                     aria-label="Save guide"
//                               >
//                                     <HeartIcon />
//                               </button>
//                         </div>

//                         {/* Rating */}
//                         <div className="flex items-center gap-1 text-sm mb-2">
//                               <span className="text-gray-800 font-medium">5</span>
//                               <div className="flex items-center gap-0.5">
//                                     {Array.from({ length: 5 }).map((_, i) => (
//                                           <StarIcon key={i} />
//                                     ))}
//                               </div>
//                               <span className="text-gray-500 text-xs ml-1">
//                                     ({guide.reviews})
//                               </span>
//                         </div>

//                         {/* Location */}
//                         <div className="flex items-start gap-2 text-sm text-gray-600 mb-1">
//                               <LocationIcon />
//                               <p className="truncate">{guide.location}</p>
//                         </div>

//                         {/* Languages */}
//                         <div className="flex items-start gap-2 text-sm text-gray-600">
//                               <GlobeIcon />
//                               <p className="truncate">{guide.languages}</p>
//                         </div>
//                   </div>

//                   {/* Message button */}
//                   <div className="px-5 pb-4 flex items-center justify-between gap-2">
//                         <Link href={`/guid/43`} >
//                               <Button className="bg-primary text-sm rounded cursor-pointer">
//                                     View Profile
//                               </Button>
//                         </Link>
//                         <Link href={`/guid/message/${guide.id}`} >
//                               <Button
//                                     className=" rounded text-sm bg-secondary hover:bg-blue-950 cursor-pointer"
//                               >
//                                     <span>Message</span>
//                               </Button>
//                         </Link>
//                   </div>
//             </article>
//       )
// }

// export default GuideCard
