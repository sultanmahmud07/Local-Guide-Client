// components/profile/ProfileSidebar.tsx
'use client'; // <-- MUST BE A CLIENT COMPONENT

import { IsActive, UserInfo } from '@/types/user.interface';
import { Card } from '@/components/ui/card';
import { User, Phone, MapPin, CheckCircle, Lock, Globe, UserCheck, Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ProfileSidebarProps {
    user: UserInfo;
    // Handler passed from ProfileClientWrapper to send the file to the API logic
    onProfilePhotoUpdate: (file: File) => void; 
}

export default function ProfileSidebar({ user, onProfilePhotoUpdate }: ProfileSidebarProps) {
    const roleName = user.role.replace(/_/g, ' ');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Determine badge color based on status
    const statusColor = {
        [IsActive.ACTIVE]: "text-green-600",
        [IsActive.INACTIVE]: "text-yellow-600",
        [IsActive.BLOCKED]: "text-red-600",
    }[user.isActive || IsActive.ACTIVE];

    const userLanguages = user.languages || [];

    // Handler for file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Call the update function passed from the parent
            onProfilePhotoUpdate(file);
        }
        // Reset the input value to allow selecting the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handler for clicking the photo area
    const handlePhotoClick = () => {
        // Trigger the hidden file input click
        fileInputRef.current?.click();
    };

    return (
        <Card className="p-6 text-center shadow-lg sticky top-0 ">
            
            {/* 🎯 HIDDEN FILE INPUT */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* 🎯 PROFILE PHOTO AREA (Clickable and Interactive) */}
            <div
                className="profile-photo w-28 h-28 bg-gray-200 rounded-full overflow-hidden mx-auto flex items-center justify-center mb-4 border-4 border-green-500 relative cursor-pointer group"
                onClick={handlePhotoClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {
                    user?.picture ?
                        <Image 
                            src={user.picture} 
                            alt='profile' 
                            width={112} // Use explicit dimensions for Next/Image
                            height={112} 
                            className="object-cover w-full h-full"
                        />
                        :
                        <User className="w-16 h-16 text-gray-500" />
                }
                
                <div 
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Camera className="w-8 h-8 text-white" />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
            
            <div className="space-y-3 text-left border-t pt-4">
                {/* ... (Rest of the user details section) ... */}
                <div className="flex items-center text-sm font-medium">
                    <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                    <span className="capitalize">{roleName}</span>
                </div>

                <div className="flex items-center text-sm">
                    {user.isVerified ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                    ) : (
                        <Lock className="w-4 h-4 mr-2 text-red-500" />
                    )}
                    <span>{user.isVerified ? "Email Verified" : "Email Unverified"}</span>
                </div>

                <div className={`flex items-center text-sm ${statusColor}`}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: statusColor.slice(5) }}></span>
                    <span>{user.isActive}</span>
                </div>

                {user.phone && (
                    <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user.phone}</span>
                    </div>
                )}

                {user.address && (
                    <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{user.address}</span>
                    </div>
                )}

                {userLanguages.length > 0 && (
                    <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{userLanguages.join(', ')}</span>
                    </div>
                )}
            </div>
        </Card>
    );
}