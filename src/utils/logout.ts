
import axios from "axios";

export const logout = async () => {
  await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/logout`, {}, { withCredentials: true });
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
  localStorage.clear();
  sessionStorage.clear();
};
