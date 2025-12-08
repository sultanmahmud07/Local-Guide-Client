// app/dashboard/profile/page.tsx
import ProfileClientWrapper from "@/components/module/Dashboard/Profile/ProfileClientWrapper";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUser } from "@/types/user.interface"; 

// --- MOCK FUNCTION (REPLACE WITH REAL IMPLEMENTATION) ---
// This should be your actual server function to get user data
const mockGetUserInfo = async () => ({
    user: {
        _id: '692c72756bfbb7b2501e266c',
        name: "Sultan Mahmud",
        email: "tourist@gmail.com",
        role: "TOURIST", // Changed to string for easier mock setup
        isActive: "ACTIVE",
        isVerified: true,
        address: "Dhaka, Bangladesh",
        phone: "01323678767",
        auths: [{ provider: "credentials", providerId: "tourist@gmail.com" }],
        bio: "Passionate traveler always looking for the next adventure!",
        languages: ["English", "Bengali"],
    } as unknown as IUser
});
// --------------------------------------------------------

const MyProfilePage = async () => {
  // Use your actual implementation: const userInfo = await getUserInfo();
  const userInfo = await getUserInfo(); 
  console.log(userInfo)
  if (!userInfo?.role) {
    return <div className="text-center py-20">Error: Could not load user profile.</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-3">My Profile</h1>
      
      {/* Pass the fully-fetched user data to the Client Wrapper */}
      <ProfileClientWrapper initialUser={userInfo} />
    </div>
  );
};

export default MyProfilePage;