import { getCookie } from "@/services/auth/tokenHandlers";
import Navbar from "./Navbar"
import { getUserInfo } from "@/services/auth/getUserInfo";

const NavbarWrapper = async () => {
       const accessToken = await getCookie("accessToken");
        const userInfo = await getUserInfo();
  return (
    <Navbar accessToken={accessToken}  userInfo={userInfo}></Navbar>
  )
}

export default NavbarWrapper