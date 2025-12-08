import ProfileClientWrapper from "@/components/module/Dashboard/Profile/ProfileClientWrapper";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo(); 
  console.log(userInfo)
  if (!userInfo?.role) {
    return <div className="text-center py-20">Error: Could not load user profile.</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-3">My Profile</h1>
      <ProfileClientWrapper initialUser={userInfo} />
    </div>
  );
};

export default MyProfilePage;