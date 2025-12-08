// components/profile/ProfileSidebar.tsx
import { IsActive, UserInfo } from '@/types/user.interface';
import { Card } from '@/components/ui/card';
import { User, Phone, MapPin, CheckCircle, Lock, Globe, UserCheck } from 'lucide-react';
import Image from 'next/image';


export default function ProfileSidebar({ user }: { user: UserInfo }) {
      const roleName = user.role.replace(/_/g, ' ');

      // Determine badge color based on status
      const statusColor = {
            [IsActive.ACTIVE]: "text-green-600",
            [IsActive.INACTIVE]: "text-yellow-600",
            [IsActive.BLOCKED]: "text-red-600",
      }[user.isActive || IsActive.ACTIVE]; // Use ACTIVE as default fallback

      const userLanguages = user.languages || [];

      return (
            <Card className="p-6 text-center shadow-lg sticky top-0 md:h-full">
                  {
                        user?.picture ?
                              <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mx-auto flex items-center justify-center mb-4 border-4 border-green-500">
                                    <Image src={user.picture} alt='profile' width={100} height={100} />
                              </div>
                              :
                              <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4 border-4 border-green-500">
                                    <User className="w-16 h-16 text-gray-500" />
                              </div>
                  }
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                  <div className="space-y-3 text-left border-t pt-4">

                        {/* Role */}
                        <div className="flex items-center text-sm font-medium">
                              <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                              <span className="capitalize">{roleName}</span>
                        </div>

                        {/* Verification Status */}
                        <div className="flex items-center text-sm">
                              {user.isVerified ? (
                                    <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                              ) : (
                                    <Lock className="w-4 h-4 mr-2 text-red-500" />
                              )}
                              <span>{user.isVerified ? "Email Verified" : "Email Unverified"}</span>
                        </div>

                        {/* Account Status */}
                        <div className={`flex items-center text-sm ${statusColor}`}>
                              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: statusColor.slice(5) }}></span>
                              <span>{user.isActive}</span>
                        </div>

                        {/* Phone */}
                        {user.phone && (
                              <div className="flex items-center text-sm">
                                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                    <span>{user.phone}</span>
                              </div>
                        )}

                        {/* Address */}
                        {user.address && (
                              <div className="flex items-center text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                    <span>{user.address}</span>
                              </div>
                        )}

                        {/* Languages */}
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