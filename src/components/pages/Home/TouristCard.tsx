'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { IUser } from '@/types/user.interface';

const TouristCard = ({ user }: { user: IUser }) => {
    // Ensure we have fallback data for safety
    const location = user.address || 'Global Traveler';
    const profileUrl = `/profile/${user._id}`; // Link to the user's public profile

    return (
        <Link 
            href={profileUrl} 
            passHref
            className="group block h-full"
        >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-100 h-full p-5 text-center flex flex-col justify-center items-center">
                
                {/* Image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-green-200 group-hover:border-green-400 transition">
                    <Image
                        src={user?.picture || "/default.png"}
                        alt={user.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
                    {user.name}
                </h3>
                <p className="text-sm font-medium text-green-600 mb-3">
                    {user.role}
                </p>

                {/* Location */}
                <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-green-500" />
                    <span className="truncate max-w-[120px]" title={location}>
                        {location}
                    </span>
                </div>
                
                {/* CTA/Link Indicator */}
                <div className="flex items-center text-sm font-semibold text-green-700 group-hover:text-green-900 transition mt-auto">
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default TouristCard;