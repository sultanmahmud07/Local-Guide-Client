'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserInfo, Role } from '@/types/user.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TouristProfileForm from './TouristProfileForm';
import ProfileSidebar from './ProfileSidebar';
import { updateProfile } from '@/services/auth/getUserInfo';
import { toast } from 'sonner';
import GuideProfileForm from './GuideProfileForm';

interface ProfileClientWrapperProps {
      initialUser: UserInfo;
}

export default function ProfileClientWrapper({ initialUser }: ProfileClientWrapperProps) {
      const router = useRouter();
      const [isEditing, setIsEditing] = useState(false);
      const [currentUser, setCurrentUser] = useState<UserInfo>(initialUser);
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleUpdate = async (
            updatedData: Partial<UserInfo>,
            profilePictureFile?: File
      ) => {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("data", JSON.stringify(updatedData))
            if (profilePictureFile) {
                  formData.append("file", profilePictureFile);
            }

            try {
                  const result = await updateProfile(formData);
                  if (result?.success) {
                        toast.success("Review submitted successfully!");
                        router.refresh();
                        setCurrentUser(prev => ({ ...prev, ...updatedData }));
                        setIsEditing(false);
                  } else {
                        toast.error(result.message || "Failed to submit review.");
                  }

            } catch (error) {
                  console.error("Profile update failed:", error);
            } finally {
                  setIsSubmitting(false);
            }
      };
      const renderProfileContent = () => {
            switch (currentUser.role) {
                  case Role.TOURIST:
                        return (
                              <TouristProfileForm
                                    user={currentUser}
                                    isEditing={isEditing}
                                    isSubmitting={isSubmitting} // Pass submission state
                                    onSave={handleUpdate}
                                    onCancel={() => setIsEditing(false)}
                              />
                        );
                  case Role.GUIDE:
                        // Render GuideProfileForm here, passing appropriate props
                        return (
                              <GuideProfileForm
                                    user={currentUser}
                                    isEditing={isEditing}
                                    isSubmitting={isSubmitting} // Pass submission state
                                    onSave={handleUpdate}
                                    onCancel={() => setIsEditing(false)}
                              />
                        );
                  default:
                        return <p>User role not supported for profile editing.</p>;
            }
      };

      return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 ">

                  {/* Left Sidebar */}
                  <div className="lg:col-span-1">
                        <ProfileSidebar 
                    user={currentUser} 
                    onProfilePhotoUpdate={(file) => handleUpdate({}, file)} // Pass handler
                />
                  </div>

                  {/* Right Content Area */}
                  <Card className="lg:col-span-3 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle className="text-2xl">Personal & Account Information</CardTitle>
                              <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    disabled={isSubmitting}
                                    variant={isEditing ? "secondary" : "default"}
                                    className={isEditing ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}
                              >
                                    {isEditing ? "Exit Edit Mode" : "Edit Profile"}
                              </Button>
                        </CardHeader>
                        <CardContent>
                              {renderProfileContent()}
                        </CardContent>
                  </Card>
            </div>
      );
}