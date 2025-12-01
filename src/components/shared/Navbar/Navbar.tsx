/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { FaFacebookF, FaLinkedinIn, FaPhone, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next/client";
import React, { useEffect, useState } from "react";
import { logout } from "@/utils/logout";
import Cookies from "js-cookie";


const Navbar = () => {
  const [navToggle, setNavToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

  useEffect(() => {
    const cookieValue = getCookie("accessToken");
    const localValue = localStorage.getItem("token");
    const finalToken = localValue || (cookieValue ? cookieValue.toString() : null);
    if (finalToken) {
      setToken(finalToken);
    }
  }, []);

const newToken = Cookies.get("accessTokenNew");

// You can create a JSON object:
const cookieData = {
  accessToken: newToken
};

const jsonString = JSON.stringify(cookieData);

console.log(jsonString);

  const isAdmin = Boolean(token);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

// Check token on mount & whenever localStorage/cookie changes
useEffect(() => {
  const cookieValue = getCookie("accessToken");
  const localValue = localStorage.getItem("token");
  const finalToken = localValue || (cookieValue ? cookieValue.toString() : null);
  setToken(finalToken);
}, []);

// Logout handler
const handleLogout = async () => {
  await logout();
  setToken(null);       // ← this ensures Navbar re-renders immediately
  router.push("/login"); // navigate to login page
};


  const navigationLinks = [
    { href: "/", label: "Home", role: "PUBLIC" },
    { href: "/about", label: "About", role: "PUBLIC" },
    { href: "/projects", label: "Projects", role: "PUBLIC" },
    { href: "/blogs", label: "Blogs", role: "PUBLIC" },
    { href: "/contact", label: "Contact Me", role: "PUBLIC" }
  ];

  return (
    <header>
      <nav className={`z-40  fixed top-[-5px] left-0 right-0 w-full py-2 lg:py-1 ${isSticky ? "border-b bg-background" : "bg-[#00000000]"}`}>
        <div className={`nav_top text-white bg-secondary py-2 ${isSticky ? " hidden" : "hidden md:block"}`}>
          <div className="main-container flex items-center justify-between">
            <div className="email_and_number flex items-center gap-8">
              <p className="flex items-center gap-2 text-white">
                <span><FaPhone /></span>
                <span>+8801327357894</span>
              </p>
              <p className="flex items-center gap-2 text-white">
                <span className="text-xl"><MdOutlineEmail /></span>
                <span>info@gmail.com</span>
              </p>
            </div>
            <div className="social_media_link">
              <div className="flex items-center gap-3">
                <span>Follow Us:</span>
                <a href="https://www.facebook.com/joltorongo.awt" className="flex items-center justify-center transition text-white text-base">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com/jol.torongo.coxbazar" className="flex items-center justify-center transition text-white text-base">
                  <IoLogoInstagram />
                </a>
                <a href="https://www.linkedin.com/company/joltorongo" className="flex items-center justify-center transition text-white text-base">
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.youtube.com/@JoltorongoAWT"
                  className="flex items-center justify-center transition text-white text-base"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`main-container flex justify-between items-center`}>
          {/* Logo side here >>>>>>>>>>>>>>>> */}
          <div className="nav_logo_side">
            <Link className="flex flex-col items-center" href="/">
              <Image
                src="/logo/logo.png"
                alt="logo"
                width={200}
                height={100}
                className="w-20"
              />
              {/* <span className="text- text-xs uppercase font-bold">Express BD</span> */}
            </Link>
          </div>
          {/* NAv manu side here >>>>>>>>>>>>>>>> */}
          <div className={`absolute ${navToggle ? "left-0" : "left-[-120%] w-1/2 "
            } top-[5.2rem] flex w-full shadow md:shadow-none flex-col py-2 transition-all duration-300  lg:static lg:w-[unset] lg:flex-row  bg-background lg:bg-transparent lg:pb-0 lg:pt-0 `}
          >
            <ul className="capitalize flex pb-20 md:pb-0 pl-10 md:pl-0 flex-col lg:flex-row items-start md:items-center justify-center gap-5 md:gap-3 px-1">
              {
                navigationLinks.map((link, index) => {
                  return (
                    <React.Fragment key={index}>
                      {
                        link.role === "PUBLIC" && (
                          <li className=" md:mx-1 py-2 lg:py-6 relative">
                            <NavLink
                              onClick={() => setNavToggle(false)}
                              href={link.href}
                              className={`flex font-semibold transition uppercase text-sm items-center gap-2 `}
                            >
                              {link.label}
                            </NavLink>
                          </li>
                        )
                      }
                    </React.Fragment>
                  )
                })}
              {
                isAdmin &&
                <li className=" md:mx-1 py-2 lg:py-6 relative">
                  <NavLink
                    onClick={() => setNavToggle(false)}
                    href="/dashboard"
                    className={`flex font-semibold transition uppercase text-sm items-center gap-2 `}
                  >
                    Dashboard
                  </NavLink>
                </li>
              }
            </ul>
          </div>
          {/* Right side here >>>>>>>>>>>>>>>> */}
          <div className="nav_right_side hidden lg:block ">
            <div className="flex justify-end items-center gap-2">
              {isAdmin ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-sm"
                >
                  Logout
                </Button>
              ) :
                <Button asChild className="text-sm rounded-full px-7">
                  <Link href="/login">Login</Link>
                </Button>
              }
            </div>
          </div>
          {/* Right toggle bar for mobile  */}
          {/* Mobile Toggle Button */}
          <div className="lg:hidden">
            <div className="flex justify-end items-center gap-2">
              {isAdmin && (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-xs size-8 px-7"
                >
                  Logout
                </Button>
              )}
              {!isAdmin && (
                <Button asChild className="text-xs size-8 px-7">
                  <Link href="/login">Login</Link>
                </Button>
              )}

              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={navToggle}
                  onChange={() => setNavToggle((prev) => !prev)}
                />
                {navToggle ? (
                  <svg
                    className="fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                ) : (
                  <svg
                    className="fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                )}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
